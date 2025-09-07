import React, { useState } from "react"
import { UserIcon, GraduationCapIcon, ArrowLeftIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StudentRegistration } from "./student-registration/student-registration"
import { TeacherRegistration } from "./teacher-registration/teacher-registration"

type RegistrationType = "student" | "teacher" | null

export const RegistrationSelector: React.FC = () => {
  const [selectedType, setSelectedType] = useState<RegistrationType>(null)

  const handleBack = () => {
    setSelectedType(null)
  }

  if (selectedType === null) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Choose Registration Type</h2>
          <p className="text-muted-foreground">Select whether you want to register a student or teacher</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary/50"
            onClick={() => setSelectedType("student")}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <UserIcon className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Register Student</CardTitle>
              <CardDescription>Add a new student to the system</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg">
                Select Student Registration
              </Button>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary/50"
            onClick={() => setSelectedType("teacher")}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <GraduationCapIcon className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Register Teacher</CardTitle>
              <CardDescription>Add a new teacher to the system</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg">
                Select Teacher Registration
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={handleBack}>
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Selection
        </Button>
        <h2 className="text-2xl font-bold">{selectedType === "student" ? "Register Student" : "Register Teacher"}</h2>
      </div>

      {selectedType === "student" ? <StudentRegistration /> : <TeacherRegistration />}
    </div>
  )
}
