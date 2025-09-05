"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { UserCheck, Search } from "lucide-react"
import { useState } from "react"

const mockTeachers = [
  { id: 1, name: "John Smith", email: "john.smith@school.com", classes: ["Grade 5-A", "Grade 5-B"] },
  { id: 2, name: "Sarah Johnson", email: "sarah.johnson@school.com", classes: ["Grade 6-A"] },
  { id: 3, name: "Michael Davis", email: "michael.davis@school.com", classes: ["Grade 6-B", "Grade 7"] },
  { id: 4, name: "Emily Wilson", email: "emily.wilson@school.com", classes: ["Grade 8-A", "Grade 8-B"] },
]

export function TeacherList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTeachers = mockTeachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="w-5 h-5" />
          Teacher List
        </CardTitle>
        <CardDescription>Manage and view all registered teachers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search teachers by name or email..."
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
                <p className="text-sm text-muted-foreground">{teacher.email}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {teacher.classes.map((className) => (
                  <Badge
                    key={className}
                    variant="outline"
                    className="bg-primary text-primary-foreground border-primary"
                  >
                    {className}
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
