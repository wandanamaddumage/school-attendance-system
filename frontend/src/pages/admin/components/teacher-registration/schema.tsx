import { z } from "zod"

export const teacherRegistrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 6 characters"),
})

export type TeacherRegistrationSchema = z.infer<typeof teacherRegistrationSchema>