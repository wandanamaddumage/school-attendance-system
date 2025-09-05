"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { UserPlus } from "lucide-react"

export function StudentRegistration() {
  const [name, setName] = useState("")
  const [grade, setGrade] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    alert(`Student registered successfully: ${name} has been added to ${grade}`)

    setName("")
    setGrade("")
    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Register Student
        </CardTitle>
        <CardDescription>Add a new student to the system</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="student-name">Student Name</Label>
            <Input
              id="student-name"
              placeholder="Enter student's full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="student-grade">Class/Grade</Label>
            <Select value={grade} onValueChange={setGrade} required>
              <SelectTrigger>
                <SelectValue placeholder="Select class/grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Grade 1">Grade 1</SelectItem>
                <SelectItem value="Grade 2">Grade 2</SelectItem>
                <SelectItem value="Grade 3">Grade 3</SelectItem>
                <SelectItem value="Grade 4">Grade 4</SelectItem>
                <SelectItem value="Grade 5-A">Grade 5-A</SelectItem>
                <SelectItem value="Grade 5-B">Grade 5-B</SelectItem>
                <SelectItem value="Grade 6-A">Grade 6-A</SelectItem>
                <SelectItem value="Grade 6-B">Grade 6-B</SelectItem>
                <SelectItem value="Grade 7">Grade 7</SelectItem>
                <SelectItem value="Grade 8-A">Grade 8-A</SelectItem>
                <SelectItem value="Grade 8-B">Grade 8-B</SelectItem>
                <SelectItem value="Grade 9">Grade 9</SelectItem>
                <SelectItem value="Grade 10">Grade 10</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register Student"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
