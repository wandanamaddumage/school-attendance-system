<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    /**
     * Get student attendance history and summary
     */
    public function studentReport(Student $student)
    {
        $attendances = $student->attendances()
            ->with(['class', 'teacher'])
            ->orderBy('date', 'desc')
            ->get();

        $summary = [
            'total_days' => $attendances->count(),
            'present_days' => $attendances->where('status', 'present')->count(),
            'absent_days' => $attendances->where('status', 'absent')->count(),
            'attendance_percentage' => $attendances->count() > 0
                ? round(($attendances->where('status', 'present')->count() / $attendances->count()) * 100, 2)
                : 0,
        ];

        return response()->json([
            'student' => $student->load('class'),
            'summary' => $summary,
            'history' => $attendances,
        ]);
    }

    /**
     * Get class monthly attendance report
     */
    public function classMonthlyReport(Request $request)
    {
        $request->validate([
            'class_id' => 'required|exists:classes,id',
            'month' => 'required|date_format:Y-m',
        ]);

        $classId = $request->class_id;
        $month = $request->month;

        // Get all students in the class
        $students = Student::where('class_id', $classId)->get();

        // Get attendance data for the month
        $attendances = Attendance::where('class_id', $classId)
            ->whereRaw("strftime('%Y-%m', date) = ?", [$month])
            ->get()
            ->groupBy('student_id');

        $report = $students->map(function ($student) use ($attendances) {
            $studentAttendances = $attendances->get($student->id, collect());

            return [
                'student_id' => $student->id,
                'student_name' => $student->name,
                'total_days' => $studentAttendances->count(),
                'present_days' => $studentAttendances->where('status', 'present')->count(),
                'absent_days' => $studentAttendances->where('status', 'absent')->count(),
                'attendance_percentage' => $studentAttendances->count() > 0
                    ? round(($studentAttendances->where('status', 'present')->count() / $studentAttendances->count()) * 100, 2)
                    : 0,
            ];
        });

        return response()->json([
            'class_id' => $classId,
            'month' => $month,
            'students' => $report,
        ]);
    }
}
