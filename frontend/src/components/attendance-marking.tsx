"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, CheckCircle, XCircle, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockStudents = {
  "Grade 5-A": [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Charlie Brown" },
    { id: 4, name: "Diana Prince" },
  ],
  "Grade 5-B": [
    { id: 5, name: "Carol Davis" },
    { id: 6, name: "Edward Norton" },
    { id: 7, name: "Fiona Green" },
  ],
  "Grade 6-A": [
    { id: 8, name: "David Wilson" },
    { id: 9, name: "Emma Brown" },
    { id: 10, name: "George Lucas" },
  ],
}

export function AttendanceMarking() {
  const [selectedClass, setSelectedClass] = useState("")
  const [attendance, setAttendance] = useState<Record<number, "present" | "absent">>({})
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const students = selectedClass ? mockStudents[selectedClass as keyof typeof mockStudents] || [] : []

  const handleAttendanceChange = (studentId: number, status: "present" | "absent") => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }))
  }

  const handleSubmit = async () => {
    if (!selectedClass || students.length === 0) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const presentCount = Object.values(attendance).filter((status) => status === "present").length
    const totalCount = students.length

    toast({
      title: "Attendance saved successfully",
      description: `${presentCount}/${totalCount} students marked present for ${selectedClass}`,
    })

    setIsLoading(false)
  }

  const presentCount = Object.values(attendance).filter((status) => status === "present").length
  const absentCount = Object.values(attendance).filter((status) => status === "absent").length

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
              <SelectValue placeholder="Choose a class to mark attendance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Grade 5-A">Grade 5-A</SelectItem>
              <SelectItem value="Grade 5-B">Grade 5-B</SelectItem>
              <SelectItem value="Grade 6-A">Grade 6-A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedClass && students.length > 0 && (
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
              <h3 className="font-medium">Students in {selectedClass}</h3>
              {students.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
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
              disabled={isLoading || Object.keys(attendance).length !== students.length}
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Saving..." : "Save Attendance"}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
