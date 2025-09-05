"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Search, GraduationCap } from "lucide-react"

const mockTeachers = [
  { id: "1", name: "Ms. Sarah Johnson", subject: "Mathematics", classes: ["Grade 5-A", "Grade 6-A"] },
  { id: "2", name: "Mr. John Smith", subject: "English", classes: ["Grade 5-B", "Grade 6-B"] },
  { id: "3", name: "Dr. Emily Davis", subject: "Science", classes: ["Grade 7", "Grade 8-A"] },
  { id: "4", name: "Mr. Michael Wilson", subject: "Physical Education", classes: ["All Grades"] },
]

export function TeacherList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTeachers = mockTeachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          Teacher List
        </CardTitle>
        <CardDescription>Manage and view all registered teachers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search teachers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="space-y-3">
          {filteredTeachers.map((teacher) => (
            <div key={teacher.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-medium">{teacher.name}</p>
                <p className="text-sm text-muted-foreground">{teacher.subject}</p>
              </div>
              <div className="flex gap-2">
                {teacher.classes.map((cls, index) => (
                  <Badge key={index} variant="outline">
                    {cls}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
