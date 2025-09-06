import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LogOut, Users, UserPlus, BarChart3, Calendar } from "lucide-react"
import { TeacherRegistration } from "@/pages/admin/components/teacher-registration"
import { StudentList } from "@/pages/admin/components/student-list"
import { TeacherList } from "@/pages/admin/components/teacher-list"
import { AttendanceReports } from "@/components/attendance-reports"
import { StudentRegistration } from "./components/student-registration"
import type { User } from "@/types/types"

interface AdminDashboardProps {
  user: User
  onLogout: () => void
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {user.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              Administrator
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">+12 from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
                  <UserPlus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94.2%</div>
                  <p className="text-xs text-muted-foreground">+2.1% from last week</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest attendance and registration updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Attendance marked for Grade 5-A</p>
                      <p className="text-sm text-muted-foreground">Teacher Smith • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <UserPlus className="w-5 h-5 text-secondary" />
                    <div>
                      <p className="font-medium">New student registered: John Doe</p>
                      <p className="text-sm text-muted-foreground">Grade 8-B • 4 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students */}
          <TabsContent value="students">
            <StudentList />
          </TabsContent>

          {/* Teachers */}
          <TabsContent value="teachers">
            <TeacherList />
          </TabsContent>

          {/* Register */}
          <TabsContent value="register" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StudentRegistration />
              <TeacherRegistration />
            </div>
          </TabsContent>

          {/* Reports */}
          <TabsContent value="reports">
            <AttendanceReports />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
