<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    /**
     * Create a new student (admin only)
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'class_id' => 'required|exists:classes,id',
        ]);

        $student = Student::create($request->only('name', 'class_id'));

        return response()->json($student->load('class'), 201);
    }

    /**
     * Get all students with optional class filter (admin can see all, teacher can see all)
     */
    public function index(Request $request)
    {
        $query = Student::with('class');

        if ($request->has('class_id')) {
            $query->where('class_id', $request->class_id);
        }

        $students = $query->get();

        return response()->json($students);
    }

    /**
     * Get students for teacher (same as index for now)
     */
    public function teacherStudents(Request $request)
    {
        return $this->index($request);
    }
}
