export const Endpoints = {
  // Authentication
  Login: "/auth/login",
  Logout: "/auth/logout",

  // Teacher Management (Admin)
  CreateTeacher: "/teachers",
  GetAllTeachers: "/teachers",

  // Class Management (Admin)
  CreateClass: "/classes",
  GetAllClasses: "/classes",

  // Student Management (Admin)
  CreateStudent: "/students",
  GetAllStudents: "/students",

  // Teacher - Class Access
  GetTeacherClasses: "/teachers/classes",
  GetTeacherStudents: "/teachers/students",

  // Teacher - Attendance
  MarkAttendance: "/attendance/mark",
  GetStudentsByClass: "/teacher/students",

  // Reports
  GetStudentReport: "/reports/student",        
  GetClassReport: "/reports/class",             
}
