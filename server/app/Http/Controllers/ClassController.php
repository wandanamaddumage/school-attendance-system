<?php

namespace App\Http\Controllers;

use App\Models\SchoolClass;
use Illuminate\Http\Request;

class ClassController extends Controller
{
    /**
     * Create a new class (admin only)
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:classes,name',
        ]);

        $class = SchoolClass::create($request->only('name'));

        return response()->json($class, 201);
    }

    /**
     * Get all classes (admin can see all, teacher can see all)
     */
    public function index()
    {
        $classes = SchoolClass::with('students')->get();

        return response()->json($classes);
    }

    /**
     * Get classes for teacher (same as index for now)
     */
    public function teacherClasses()
    {
        return $this->index();
    }
}
