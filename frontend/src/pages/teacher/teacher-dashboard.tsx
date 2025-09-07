import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LogOut, GraduationCap, Calendar, BarChart3 } from "lucide-react"
import { AttendanceMarking } from "@/components/attendance-marking"
import type { User } from "@/types/types"
import AttendanceReports from "./components/attendance-report"

interface TeacherDashboardProps {
  user: User
  onLogout: () => void
}

export function TeacherDashboard({ user, onLogout }: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState("reports")

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Teacher Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {user.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              Teacher
            </Badge>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            {/* <TabsTrigger value="overview">Overview</TabsTrigger> */}
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="attendance">Mark Attendance</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          {/* <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">My Classes</CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Grade 5-A, 5-B, 6-A</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78</div>
                  <p className="text-xs text-muted-foreground">Across all classes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Attendance</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">96.2%</div>
                  <p className="text-xs text-muted-foreground">75 of 78 present</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Today's Classes</CardTitle>
                <CardDescription>Your scheduled classes for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Grade 5-A</p>
                      <p className="text-sm text-muted-foreground">26 students • 9:00 AM - 10:00 AM</p>
                    </div>
                    <Badge variant="outline" className="bg-chart-1 text-white border-chart-1">
                      Completed
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Grade 5-B</p>
                      <p className="text-sm text-muted-foreground">25 students • 11:00 AM - 12:00 PM</p>
                    </div>
                    <Badge variant="outline" className="bg-secondary text-secondary-foreground border-secondary">
                      In Progress
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Grade 6-A</p>
                      <p className="text-sm text-muted-foreground">27 students • 2:00 PM - 3:00 PM</p>
                    </div>
                    <Badge variant="outline">Upcoming</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}

          <TabsContent value="attendance">
            <AttendanceMarking />
          </TabsContent>

          <TabsContent value="reports">
            <AttendanceReports />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
