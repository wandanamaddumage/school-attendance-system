"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Search } from "lucide-react"
import { useState } from "react"

const mockStudents = [
  { id: 1, name: "Alice Johnson", grade: "Grade 5-A", attendance: 95 },
  { id: 2, name: "Bob Smith", grade: "Grade 5-A", attendance: 88 },
  { id: 3, name: "Carol Davis", grade: "Grade 5-B", attendance: 92 },
  { id: 4, name: "David Wilson", grade: "Grade 6-A", attendance: 85 },
  { id: 5, name: "Emma Brown", grade: "Grade 6-A", attendance: 97 },
  { id: 6, name: "Frank Miller", grade: "Grade 6-B", attendance: 90 },
]

export function StudentList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredStudents = mockStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
                <Badge
                  variant={
                    student.attendance >= 90 ? "default" : student.attendance >= 80 ? "secondary" : "destructive"
                  }
                  className={
                    student.attendance >= 90
                      ? "bg-chart-4 text-white"
                      : student.attendance >= 80
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-destructive text-destructive-foreground"
                  }
                >
                  {student.attendance >= 90 ? "Excellent" : student.attendance >= 80 ? "Good" : "Needs Attention"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
