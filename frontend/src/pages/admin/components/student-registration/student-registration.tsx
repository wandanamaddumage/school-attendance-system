import { UserPlus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { GRADES } from "@/constants/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/form/input/input-field";
import { useCreateStudentMutation } from "@/store/api/splits/students";
import { studentSchema, type StudentSchema } from "./schema";
import { ToastContainer } from "react-toastify";

export function StudentRegistration() {
  const { toast } = useToast();
  const [createStudent, { isLoading }] = useCreateStudentMutation();

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<StudentSchema>({
    resolver: zodResolver(studentSchema),
    defaultValues: { name: "", class_id: "" },
  });  

  const onSubmit = async (data: StudentSchema) => {
    try {
      const result = await createStudent({
        name: data.name,
        class_id: Number(data.class_id),
      }).unwrap();

      toast.success(`Student registered successfully. ${data.name} has been added to the system!`);

      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Server error, please try again later.");
    }
  };

  return (
    <>
     <ToastContainer position="top-right" autoClose={3000} />
     <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Register Student
        </CardTitle>
        <CardDescription>Add a new student to the system</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <FormField
            name="name"
            label="Student Name"
            placeholder="Enter student's full name"
            control={control}
            error={errors.name}
          />

          {/* Grade Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Class/Grade</label>
            <Select onValueChange={(val) => setValue("class_id", val)} defaultValue="">
              <SelectTrigger>
                <SelectValue placeholder="Select class/grade" />
              </SelectTrigger>
              <SelectContent>
                {GRADES.map((grade) => (
                  <SelectItem key={grade.id} value={String(grade.id)}>
                    {grade.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.class_id && (
              <p className="text-sm text-red-500">{errors.class_id.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register Student"}
          </Button>
        </form>
      </CardContent>
    </Card>
    </>
  );
}
