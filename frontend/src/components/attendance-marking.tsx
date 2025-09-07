import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Calendar, CheckCircle, Save, XCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { GRADES } from "@/constants/constants";
import { useGetStudentsByClassQuery } from "@/store/api/splits/classes";
import { skipToken } from "@reduxjs/toolkit/query/react";


export function AttendanceMarking() {
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [attendance, setAttendance] = useState<Record<number, "present" | "absent">>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Fetch students whenever selectedClass changes
  const { data: students = [], isLoading: isStudentsLoading, refetch } = useGetStudentsByClassQuery(
    selectedClass ? { class_id: Number(selectedClass) } : skipToken, // skip if no class selected
    { skip: !selectedClass } 
  );

  // Reset attendance when class changes
  useEffect(() => {
    setAttendance({});
  }, [selectedClass]);

  const handleAttendanceChange = (studentId: number, status: "present" | "absent") => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = async () => {
    if (!selectedClass || students.length === 0) return;

    setIsSubmitting(true);

    try {
      // Call your attendance API here
      // Example: await markAttendanceMutation({ class_id: Number(selectedClass), date: new Date().toISOString().split('T')[0], attendances: students.map(s => ({ student_id: s.id, status: attendance[s.id] || "absent" })) });

      const presentCount = Object.values(attendance).filter((s) => s === "present").length;

      toast({
        title: "Attendance saved successfully",
        description: `${presentCount}/${students.length} students marked present for ${
          GRADES.find((g) => g.id === Number(selectedClass))?.label || selectedClass
        }`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save attendance",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const presentCount = Object.values(attendance).filter((s) => s === "present").length;
  const absentCount = Object.values(attendance).filter((s) => s === "absent").length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Mark Attendance
        </CardTitle>
        <CardDescription>
          Select a class and mark attendance for today ({new Date().toLocaleDateString()})
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Class</label>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger>
              <SelectValue placeholder="Select class/grade" />
            </SelectTrigger>
            <SelectContent>
              {GRADES.map((grade) => (
                <SelectItem key={grade.id} value={String(grade.id)}>
                  {grade.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedClass && !isStudentsLoading && students.length > 0 && (
          <>
            <div className="flex gap-4 p-4 bg-muted rounded-lg">
              <div className="text-center">
                <p className="text-2xl font-bold text-chart-4">{presentCount}</p>
                <p className="text-sm text-muted-foreground">Present</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-destructive">{absentCount}</p>
                <p className="text-sm text-muted-foreground">Absent</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{students.length}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium">Students in {GRADES.find((g) => g.id === Number(selectedClass))?.label}</h3>
              {students.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg"
                >
                  <span className="font-medium">{student.name}</span>
                  <div className="flex gap-2">
                    <Button
                      variant={attendance[student.id] === "present" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleAttendanceChange(student.id, "present")}
                      className={
                        attendance[student.id] === "present" ? "bg-chart-4 text-white hover:bg-chart-4/90" : ""
                      }
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Present
                    </Button>
                    <Button
                      variant={attendance[student.id] === "absent" ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => handleAttendanceChange(student.id, "absent")}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Absent
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full"
              disabled={
                isSubmitting || Object.keys(attendance).length !== students.length
              }
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? "Saving..." : "Save Attendance"}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
