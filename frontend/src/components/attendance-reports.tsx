"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { BarChart3, Download, Calendar, TrendingUp } from "lucide-react"

const mockReportData = {
  "Grade 5-A": [
    { name: "Alice Johnson", present: 18, absent: 2, percentage: 90 },
    { name: "Bob Smith", present: 16, absent: 4, percentage: 80 },
    { name: "Carol Davis", present: 19, absent: 1, percentage: 95 },
  ],
  "Grade 5-B": [
    { name: "David Wilson", present: 17, absent: 3, percentage: 85 },
    { name: "Emma Brown", present: 20, absent: 0, percentage: 100 },
  ],
}

export function AttendanceReports() {
  const [selectedClass, setSelectedClass] = useState("")
  const [reportType, setReportType] = useState("individual")

  const currentData = selectedClass ? mockReportData[selectedClass as keyof typeof mockReportData] || [] : []

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Attendance Reports
          </CardTitle>
          <CardDescription>Generate and view attendance reports</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual Student Report</SelectItem>
                  <SelectItem value="class">Class Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedClass && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {reportType === "individual" ? "Individual" : "Class"} Report - {selectedClass}
              </span>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardTitle>
            <CardDescription>Attendance data for the current month</CardDescription>
          </CardHeader>
          <CardContent>
            {reportType === "individual" ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Average Attendance</span>
                      </div>
                      <p className="text-2xl font-bold mt-2">
                        {Math.round(
                          currentData.reduce((acc, student) => acc + student.percentage, 0) / currentData.length,
                        )}
                        %
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Total Students</span>
                      </div>
                      <p className="text-2xl font-bold mt-2">{currentData.length}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Perfect Attendance</span>
                      </div>
                      <p className="text-2xl font-bold mt-2">
                        {currentData.filter((s) => s.percentage === 100).length}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  {currentData.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Present: {student.present} days • Absent: {student.absent} days
                        </p>
                      </div>
                      <Badge
                        variant={
                          student.percentage >= 90 ? "default" : student.percentage >= 75 ? "secondary" : "destructive"
                        }
                      >
                        {student.percentage}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center p-8 bg-muted rounded-lg">
                  <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Class Summary Report</h3>
                  <p className="text-muted-foreground mb-4">Overall attendance rate for {selectedClass}</p>
                  <div className="text-3xl font-bold text-primary">
                    {Math.round(currentData.reduce((acc, student) => acc + student.percentage, 0) / currentData.length)}
                    %
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Based on {currentData.length} students</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
