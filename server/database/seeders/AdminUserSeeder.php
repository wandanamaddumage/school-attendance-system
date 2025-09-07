<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user if it doesn't exist
        User::firstOrCreate(
            ['email' => 'admin@school.com'],
            [
                'name' => 'Admin User',
                'email' => 'admin@school.com',
                'password' => Hash::make('password123'),
                'role' => 'admin',
            ]
        );

        // Create a teacher user for testing
        User::firstOrCreate(
            ['email' => 'teacher@school.com'],
            [
                'name' => 'John Doe',
                'email' => 'teacher@school.com',
                'password' => Hash::make('password123'),
                'role' => 'teacher',
            ]
        );
    }
}
