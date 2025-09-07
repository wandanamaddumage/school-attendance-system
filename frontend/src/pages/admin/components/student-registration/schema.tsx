import { z } from "zod";

export const studentSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  class_id: z.string().min(1, "Class/Grade is required"),
});

export type StudentSchema = z.infer<typeof studentSchema>;
