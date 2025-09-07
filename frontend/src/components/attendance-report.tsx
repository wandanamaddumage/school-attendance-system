import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, GraduationCap, BarChart3 } from "lucide-react"
import { GRADES } from "@/constants/constants"
import { useGetClassReportQuery } from "@/store/api/splits/reports"
import ClassReport from "@/components/class-report"

export default function ClassAttendanceReports() {
  const [selectedClass, setSelectedClass] = useState<string>("")
  const [selectedMonth, setSelectedMonth] = useState<string>("")

  const {
    data: classData,
    isLoading: classLoading,
    error: classError,
  } = useGetClassReportQuery(
    { class_id: Number(selectedClass), month: selectedMonth },
    { skip: !selectedClass || !selectedMonth },
  )

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Attendance Reports</h1>
            <p className="text-muted-foreground">Generate detailed attendance reports by class and month</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Report Filters
          </CardTitle>
          <CardDescription>Select a class and month to generate the attendance report</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                Class/Grade
              </label>
              <Select value={selectedClass} onValueChange={(val) => setSelectedClass(val)}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Choose a class or grade" />
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

            <div className="space-y-3">
              <label className="text-sm font-semibold flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                Month
              </label>
              <Input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="h-11 w-1/3"
              />
            </div>
          </div>

          {selectedClass && selectedMonth && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <BarChart3 className="h-4 w-4" />
              <span>Report ready to generate for {GRADES.find((g) => g.id === Number(selectedClass))?.label}</span>
            </div>
          )}
        </CardContent>
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
  )
}
