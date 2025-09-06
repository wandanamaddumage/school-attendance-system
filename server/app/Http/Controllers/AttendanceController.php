<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AttendanceController extends Controller
{
    /**
     * Mark attendance for students (teacher only)
     */
    public function mark(Request $request)
    {
        $request->validate([
            'class_id' => 'required|exists:classes,id',
            'date' => 'required|date',
            'attendances' => 'required|array',
            'attendances.*.student_id' => 'required|exists:students,id',
            'attendances.*.status' => 'required|in:present,absent',
        ]);

        $teacher = $request->user();
        $classId = $request->class_id;
        $date = $request->date;

        // Validate that all students belong to the specified class
        $studentIds = collect($request->attendances)->pluck('student_id');
        $studentsInClass = Student::where('class_id', $classId)
            ->whereIn('id', $studentIds)
            ->count();

        if ($studentsInClass !== count($studentIds)) {
            return response()->json([
                'message' => 'Some students do not belong to the specified class'
            ], 400);
        }

        // Check for existing attendances to prevent duplicates
        $existingAttendances = Attendance::where('teacher_id', $teacher->id)
            ->where('class_id', $classId)
            ->where('date', $date)
            ->whereIn('student_id', $studentIds)
            ->exists();

        if ($existingAttendances) {
            return response()->json([
                'message' => 'Attendance already marked for this class and date'
            ], 409);
        }

        // Bulk insert attendances
        $attendanceData = collect($request->attendances)->map(function ($attendance) use ($teacher, $classId, $date) {
            return [
                'student_id' => $attendance['student_id'],
                'class_id' => $classId,
                'date' => $date,
                'status' => $attendance['status'],
                'teacher_id' => $teacher->id,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        })->toArray();

        Attendance::insert($attendanceData);

        return response()->json([
            'message' => 'Attendance marked successfully',
            'count' => count($attendanceData)
        ], 201);
    }
}
