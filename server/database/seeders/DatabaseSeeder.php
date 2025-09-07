<?php

namespace Database\Seeders;

use App\Models\SchoolClass;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@school.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Create teacher user
        User::create([
            'name' => 'Teacher User',
            'email' => 'teacher@school.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
        ]);

        // Create classes
        $grade5 = SchoolClass::create(['name' => 'Grade 5']);
        $class10B = SchoolClass::create(['name' => 'Class 10-B']);

        // Create students for Grade 5
        Student::create(['name' => 'Alice Johnson', 'class_id' => $grade5->id]);
        Student::create(['name' => 'Bob Smith', 'class_id' => $grade5->id]);
        Student::create(['name' => 'Charlie Brown', 'class_id' => $grade5->id]);

        // Create students for Class 10-B
        Student::create(['name' => 'Diana Prince', 'class_id' => $class10B->id]);
        Student::create(['name' => 'Eve Wilson', 'class_id' => $class10B->id]);
        Student::create(['name' => 'Frank Miller', 'class_id' => $class10B->id]);
    }
}
