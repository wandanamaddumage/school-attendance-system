export interface Student {
  id?: number;
  name: string;
  grade?: string;
  attendance?: number;
}
  
export interface Teacher {
  id: number;
  name: string;
  email: string;
  classes: string[];
}
  
export interface DailyAttendance {
  date: string;
  status: "present" | "absent";
}

export interface User {
  id: string
  name: string
  email: string
}

export interface ClassData {
  totalDays: number;
  averageAttendance: number;
  students: Student[];
}