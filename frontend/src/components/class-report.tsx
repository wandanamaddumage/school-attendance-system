import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3} from "lucide-react";
import { SummaryCard } from "./summary-card";
import { Badge } from "./ui/badge";

type Student = {
  student_name: string;
  attendance_percentage: number;
};

type ClassData = {
  students: Student[];
};

interface ClassReportProps {
  selectedClass: string;
  selectedMonth: string;
  classData?: ClassData;
  classLoading: boolean;
  classError?: any;
}

export default function ClassReport({
  selectedMonth,
  classData,
  classLoading,
  classError,
}: ClassReportProps) {
  const totalDays = classData?.students?.length
  ? (classData.students[0] as any).total_days || 0
  : 0;

const averageAttendance = classData?.students?.length
  ? Math.round(
      classData.students.reduce(
        (sum, s) => sum + (s.attendance_percentage || 0),
        0
      ) / classData.students.length
    )
  : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Class Report - ({selectedMonth})
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
              {classData.students.map((student, index) => (
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
  );
}
