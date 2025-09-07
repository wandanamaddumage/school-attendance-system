import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Calendar, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useGetClassReportQuery, useGetStudentReportQuery } from "@/store/api/splits/reports";
import { useGetAllStudentsQuery } from "@/store/api/splits/students";
import { GRADES } from "@/constants/constants";
import { SummaryCard } from "./summary-card";
import ClassAttendanceReports from "@/components/attendance-report";

type ReportType = "individual" | "class";

export default function AttendanceReports() {
  const [reportType, setReportType] = useState<ReportType>("class");
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  const { data: students = [], isLoading: studentsLoading } = useGetAllStudentsQuery();

  const {
    data: studentData,
    isLoading: studentLoading,
    error: studentError,
  } = useGetStudentReportQuery(Number(selectedStudent), { skip: !selectedStudent });

  const {
    data: classData,
    isLoading: classLoading,
    error: classError,
  } = useGetClassReportQuery(
    { class_id: Number(selectedClass), month: selectedMonth },
    { skip: !selectedClass || !selectedMonth }
  );

  const totalDays =
    classData?.students?.length > 0 ? classData.students[0].total_days : 0;
  const averageAttendance =
    classData?.students?.length > 0
      ? Math.round(
          classData.students.reduce((sum: number, s: any) => sum + s.attendance_percentage, 0) /
            classData.students.length
        )
      : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-4">
        <Button
          variant={reportType === "class" ? "default" : "outline"}
          onClick={() => setReportType("class")}
        >
          Class Report
        </Button>
        <Button
          variant={reportType === "individual" ? "default" : "outline"}
          onClick={() => setReportType("individual")}
        >
          Individual Report
        </Button>
      </div>


      {reportType === "individual" && (     
        <div className="space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Individual Reports</h1>
              <p className="text-muted-foreground">Generate detailed attendance reports by Student Name</p>
            </div>
          </div>
        </div>
  
        <Card>
        <div className="space-y-2 px-10">
          <label className="text-sm font-medium">Select Student</label>
          <Select
            value={selectedStudent}
            onValueChange={(val) => setSelectedStudent(val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select student" />
            </SelectTrigger>
            <SelectContent>
              {students.map((student: any) => (
                <SelectItem key={student.id} value={String(student.id)}>
                  {student.name} ({student.class?.name})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {studentsLoading && <p className="text-sm text-muted-foreground">Loading students...</p>}
        </div>
        </Card>
  
        {selectedClass && selectedMonth && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-1 w-8 bg-primary rounded-full"></div>
              <h2 className="text-xl font-semibold">Report Results</h2>
            </div>
  
            <ClassReport
              selectedClass={selectedClass}
              selectedMonth={selectedMonth}
              classData={classData}
              classLoading={classLoading}
              classError={classError}
            />
          </div>
        )}
      </div>
      )}

      {reportType === "class" && (
       <ClassAttendanceReports/>
      )}

      {reportType === "individual" && selectedStudent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {studentLoading && "Loading..."}
              {studentError && "Failed to load student report"}
              {studentData &&
                `Student Report - ${studentData.student?.name} (${studentData.student?.class?.name})`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {studentData && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <SummaryCard label="Total Days" value={studentData.summary.total_days} />
                  <SummaryCard label="Present" value={studentData.summary.present_days} color="chart-4" />
                  <SummaryCard label="Absent" value={studentData.summary.absent_days} color="destructive" />
                  <SummaryCard label="Attendance" value={`${studentData.summary.attendance_percentage}%`} />
                </div>
                <div className="space-y-3">
                  <h3 className="font-medium">Daily Attendance</h3>
                  {studentData.history.length === 0 && <p>No attendance records yet</p>}
                  {studentData.history.map((record: any, index: number) => (
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
              </>
            )}
          </CardContent>
        </Card>
      )}

      {reportType === "class" && selectedClass && selectedMonth && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Class Report - ID: {selectedClass} ({selectedMonth})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {classLoading && <p>Loading...</p>}
            {classError && <p className="text-red-500">Failed to load class report</p>}
            {classData && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <SummaryCard label="Total Days" value={totalDays} />
                  <SummaryCard label="Students" value={classData.students.length} />
                  <SummaryCard label="Average Attendance" value={`${averageAttendance}%`} />
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Student Performance</h3>
                  {classData.students.map((student: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-muted rounded-lg"
                    >
                      <span className="font-medium">{student.student_name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">{student.attendance_percentage}%</span>
                        <Badge
                          variant={
                            student.attendance_percentage >= 90
                              ? "default"
                              : student.attendance_percentage >= 80
                              ? "secondary"
                              : "destructive"
                          }
                          className={
                            student.attendance_percentage >= 90
                              ? "bg-chart-4 text-white"
                              : student.attendance_percentage >= 80
                              ? "bg-secondary text-secondary-foreground"
                              : ""
                          }
                        >
                          {student.attendance_percentage >= 90
                            ? "Excellent"
                            : student.attendance_percentage >= 80
                            ? "Good"
                            : "Needs Attention"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

