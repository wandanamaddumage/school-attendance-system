import { useState } from "react";
import { Users, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockStudents, type Student } from "@/data/mockStudents";
import { ATTENDANCE_LABELS, ATTENDANCE_THRESHOLDS } from "@/constants/constants";

const studentWithAttendance = (student: Student) => ({
  ...student,
  attendance: Math.floor(Math.random() * 21) + 80,
});

export function StudentList() {
  const [searchTerm, setSearchTerm] = useState("");

  const allStudents = Object.values(mockStudents)
    .flat()
    .map(studentWithAttendance);

  const filteredStudents = allStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.keys(mockStudents).some((grade) =>
        student.grade?.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const getAttendanceVariant = (attendance: number) => {
    if (attendance >= ATTENDANCE_THRESHOLDS.excellent) return "default";
    if (attendance >= ATTENDANCE_THRESHOLDS.good) return "secondary";
    return "destructive";
  };

  const getAttendanceLabel = (attendance: number) => {
    if (attendance >= ATTENDANCE_THRESHOLDS.excellent) return ATTENDANCE_LABELS.excellent;
    if (attendance >= ATTENDANCE_THRESHOLDS.good) return ATTENDANCE_LABELS.good;
    return ATTENDANCE_LABELS.needsAttention;
  };

  const getAttendanceClassName = (attendance: number) => {
    if (attendance >= ATTENDANCE_THRESHOLDS.excellent) return "bg-chart-4 text-white";
    if (attendance >= ATTENDANCE_THRESHOLDS.good) return "bg-secondary text-secondary-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Student List
        </CardTitle>
        <CardDescription>Manage and view all registered students</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students by name or grade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="space-y-3">
          {filteredStudents.map((student) => (
            <div key={student.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-medium">{student.name}</p>
                <p className="text-sm text-muted-foreground">{student.grade}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium">{student.attendance}%</p>
                  <p className="text-xs text-muted-foreground">Attendance</p>
                </div>
                <Badge variant={getAttendanceVariant(student.attendance)} className={getAttendanceClassName(student.attendance)}>
                  {getAttendanceLabel(student.attendance)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
