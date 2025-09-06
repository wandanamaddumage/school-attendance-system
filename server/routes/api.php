<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Authentication routes
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Admin routes
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    // Teacher management
    Route::post('/teachers', [TeacherController::class, 'store']);
    Route::get('/teachers', [TeacherController::class, 'index']);

    // Class management
    Route::post('/classes', [ClassController::class, 'store']);
    Route::get('/classes', [ClassController::class, 'index']);

    // Student management
    Route::post('/students', [StudentController::class, 'store']);
    Route::get('/students', [StudentController::class, 'index']);
});

// Teacher routes
Route::middleware(['auth:sanctum', 'role:teacher'])->group(function () {
    // Class and student access
    Route::get('/teacher/classes', [ClassController::class, 'teacherClasses']);
    Route::get('/teacher/students', [StudentController::class, 'teacherStudents']);

    // Attendance marking
    Route::post('/attendance/mark', [AttendanceController::class, 'mark']);
});

// Report routes (accessible by both admin and teacher)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/reports/student/{student}', [ReportController::class, 'studentReport']);
    Route::get('/reports/class', [ReportController::class, 'classMonthlyReport']);
});
