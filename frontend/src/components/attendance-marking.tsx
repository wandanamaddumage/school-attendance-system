"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Badge } from "./ui/badge"
import { Calendar, Check, X, Users } from "lucide-react"

const mockStudents = [
  { id: "1", name: "Alice Johnson", rollNumber: "001" },
  { id: "2", name: "Bob Smith", rollNumber: "002" },
  { id: "3", name: "Carol Davis", rollNumber: "003" },
  { id: "4", name: "David Wilson", rollNumber: "004" },
  { id: "5", name: "Emma Brown", rollNumber: "005" },
]

export function AttendanceMarking() {
  const [selectedClass, setSelectedClass] = useState("")
  const [attendance, setAttendance] = useState<Record<string, "present" | "absent">>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAttendanceChange = (studentId: string, status: "present" | "absent") => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }))
  }

  const handleSubmit = async () => {
    if (!selectedClass) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const presentCount = Object.values(attendance).filter((status) => status === "present").length
    alert(`Attendance submitted for ${selectedClass}: ${presentCount}/${mockStudents.length} students present`)

    setAttendance({})
    setIsSubmitting(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Mark Attendance
          </CardTitle>
          <CardDescription>Select a class and mark student attendance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Class</label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Grade 5-A">Grade 5-A</SelectItem>
                <SelectItem value="Grade 5-B">Grade 5-B</SelectItem>
                <SelectItem value="Grade 6-A">Grade 6-A</SelectItem>
                <SelectItem value="Grade 6-B">Grade 6-B</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {selectedClass && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              {selectedClass} - Student List
            </CardTitle>
            <CardDescription>
              Mark attendance for each student ({Object.keys(attendance).length}/{mockStudents.length} marked)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {mockStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">Roll No: {student.rollNumber}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={attendance[student.id] === "present" ? "default" : "outline"}
                      onClick={() => handleAttendanceChange(student.id, "present")}
                      className="flex items-center gap-1"
                    >
                      <Check className="w-4 h-4" />
                      Present
                    </Button>
                    <Button
                      size="sm"
                      variant={attendance[student.id] === "absent" ? "destructive" : "outline"}
                      onClick={() => handleAttendanceChange(student.id, "absent")}
                      className="flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Absent
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex gap-4">
                <Badge variant="default">
                  Present: {Object.values(attendance).filter((s) => s === "present").length}
                </Badge>
                <Badge variant="destructive">
                  Absent: {Object.values(attendance).filter((s) => s === "absent").length}
                </Badge>
              </div>
              <Button
                onClick={handleSubmit}
                disabled={Object.keys(attendance).length !== mockStudents.length || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Attendance"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
