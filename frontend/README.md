# School Attendance System – Frontend

This is the **frontend application** for the School Attendance System.  
It is built with **React.js** and integrates with the backend API to manage students, teachers, attendance, and reports.

---

## Features

- **Authentication**: Login/Logout for Admin and Teacher roles.
- **Role-based Views**:
  - Admin: Register students & teachers, view reports.
  - Teacher: Mark attendance & view class/student reports.
- **Attendance Management**: Mark Present/Absent for students.
- **Reports**:
  - Individual Student Report with summary.
  - Class Report (bonus feature).
- **Responsive UI** with reusable ShadCN components.
- Toast notifications for success/failure messages.

---

## Tech Stack

- **React.js** (Functional Components & Hooks)
- **Redux Toolkit + RTK Query** (State management & API fetching)
- **ShadCN/UI + Tailwind CSS** (UI components & styling)
- **React Router DOM** (Routing)
- **React Toastify** (Notifications)
- **Vite / npm** (Development server & package manager)
- **JWT Authentication** (Access & refresh tokens)

---

## Setup Instructions

### 1. Navigate to the frontend folder
    cd frontend

    Install dependencies:
    npm install

### 2. Start development server:
        npm start 

### 3. Open your browser and navigate to:
        http://localhost:5173

---

## Test Credentials

      Admin:
        Email: admin@school.com
        Password: password

      Teacher:
        Email: teacher@school.com
        Password: password
      
