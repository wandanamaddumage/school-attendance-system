import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Calendar, User } from "lucide-react";
import { mockAttendanceData, type DailyAttendance } from "@/data/mockAttendanceData";
import { mockClassData, type ClassData } from "@/data/mockClassData";


export function AttendanceReports() {
  const [reportType, setReportType] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");

  const studentData: DailyAttendance[] = selectedStudent
    ? mockAttendanceData[selectedStudent] || []
    : [];

  const classData: ClassData | null = selectedClass
    ? mockClassData[selectedClass] || null
    : null;

  const getAttendanceSummary = (data: DailyAttendance[]) => {
    const total = data.length;
    const present = data.filter((d) => d.status === "present").length;
    const absent = total - present;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
    return { total, present, absent, percentage };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Attendance Reports
          </CardTitle>
          <CardDescription>
            View detailed attendance reports for students and classes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Report Type</label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual Student Report</SelectItem>
                <SelectItem value="class">Class Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {reportType === "individual" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Student</label>
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a student" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(mockAttendanceData).map((student) => (
                    <SelectItem key={student} value={student}>
                      {student}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {reportType === "class" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a class" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(mockClassData).map((className) => (
                    <SelectItem key={className} value={className}>
                      {className}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {reportType === "individual" && selectedStudent && studentData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {selectedStudent} - Attendance Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(() => {
                const summary = getAttendanceSummary(studentData);
                return (
                  <>
                    <SummaryCard label="Total Days" value={summary.total} />
                    <SummaryCard label="Present" value={summary.present} color="chart-4" />
                    <SummaryCard label="Absent" value={summary.absent} color="destructive" />
                    <SummaryCard label="Attendance" value={`${summary.percentage}%`} />
                  </>
                );
              })()}
            </div>

            {/* Daily Records */}
            <div className="space-y-3">
              <h3 className="font-medium">Daily Attendance</h3>
              {studentData.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{new Date(record.date).toLocaleDateString()}</span>
                  </div>
                  <Badge
                    variant={record.status === "present" ? "default" : "destructive"}
                    className={record.status === "present" ? "bg-chart-4 text-white" : ""}
                  >
                    {record.status === "present" ? "Present" : "Absent"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {reportType === "class" && selectedClass && classData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              {selectedClass} - Class Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SummaryCard label="Total Days" value={classData.totalDays} />
              <SummaryCard label="Students" value={classData.students.length} />
              <SummaryCard label="Average Attendance" value={`${classData.averageAttendance}%`} />
            </div>

            <div className="space-y-3">
              <h3 className="font-medium">Student Performance</h3>
              {classData.students.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <span className="font-medium">{student.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{student.attendance}%</span>
                    <Badge
                      variant={
                        student.attendance >= 90
                          ? "default"
                          : student.attendance >= 80
                          ? "secondary"
                          : "destructive"
                      }
                      className={
                        student.attendance >= 90
                          ? "bg-chart-4 text-white"
                          : student.attendance >= 80
                          ? "bg-secondary text-secondary-foreground"
                          : ""
                      }
                    >
                      {student.attendance >= 90
                        ? "Excellent"
                        : student.attendance >= 80
                        ? "Good"
                        : "Needs Attention"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

interface SummaryCardProps {
  label: string;
  value: string | number;
  color?: string;
}

function SummaryCard({ label, value, color }: SummaryCardProps) {
  return (
    <div className="text-center p-4 bg-muted rounded-lg">
      <p className={`text-2xl font-bold ${color ? `text-${color}` : ""}`}>{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
