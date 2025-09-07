# School Attendance System

A simple web application to manage student and teacher attendance. This project demonstrates a basic full-stack application with user roles, attendance management, and reporting.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technical Stack](#technical-stack)
- [Setup Instructions](#setup-instructions)
- [Test Credentials](#test-credentials)
- [Usage](#usage)
- [Bonus Features](#bonus-features)
- [Project Structure](#project-structure)
- [Notes](#notes)

---

## Project Overview
This system allows:

- **Admins** to register students and teachers, and view all attendance reports.
- **Teachers** to mark daily attendance for their classes and view attendance reports.

It includes individual student reports and an optional class report summary.

---

## Features

### User Authentication & Roles
- Login & Logout functionality.
- Two user roles:
  - **Admin** – Full access to manage users and view all reports.
  - **Teacher** – Can mark attendance and view reports for their classes.

### User Management (Admin Only)
- Register Students:
  - Name
  - Class/Grade (e.g., "Grade 5", "Class 10-B")
- Register Teachers:
  - Name, Email, Password
- View list of students and teachers.

### Attendance Module
- Teachers can:
  - View students in a selected class.
  - Mark students as **Present** or **Absent** for the current day.
  - Prevent duplicate attendance marking for the same class on the same day.

### Reporting
- **Individual Student Report:**
  - Displays a list of attendance records (Date: Present/Absent)
  - Summary: Total days, Present, Absent
- **Class Report (Optional Bonus):**
  - Monthly summary for a whole class.

---

## Technical Stack

- **Backend:** PHP (Laravel recommended) or CodeIgniter  
- **Frontend:** React.js (Functional Components)  
- **Database:** MySQL or PostgreSQL  
- **Version Control:** Git & GitHub

---

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd school-attendance-system

2. **Backend Setup:**
Navigate to backend folder:
    ```bash
    cd backend

    Install dependencies:

   ```bash
    composer install
    Configure .env with your database credentials.

    Run migrations:

    ```bash
    php artisan migrate

    Seed test data:
    ```bash
    php artisan db:seed

    Start backend server:
    ```bash
    php artisan serve

3. ***Frontend Setup***
    Navigate to frontend folder:
    ```bash
    cd frontend

    Install dependencies:
    ```bash
    npm install

4. ***Start development server:***
   ```bash
    npm start

5.  ***Open your browser and navigate to:***
    http://localhost:3000

    ***Test Credentials***

    Admin:
    Email: admin@school.com
    Password: password

    Teacher:
    Email: teacher@school.com
    Password: password
   
