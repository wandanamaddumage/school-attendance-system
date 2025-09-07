import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form/input/input-field";
import { teacherRegistrationSchema } from "./schema";
import { useCreateTeacherMutation } from "@/store/api/splits/teachers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type TeacherRegistrationSchema = z.infer<typeof teacherRegistrationSchema>;

export function TeacherRegistration() {
  const [createTeacher] = useCreateTeacherMutation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TeacherRegistrationSchema>({
    resolver: zodResolver(teacherRegistrationSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (data: TeacherRegistrationSchema) => {
    console.log("Form submitted with data:", data);
    try {
      const response = await createTeacher(data).unwrap();
      console.log("API response:", response);

      toast.success(`${data.name} has been added to the system!`);

      reset();
    } catch (error: any) {
      console.error("API error:", error);
      toast.error(error?.data?.message || "Server error, please try again later");
    }
  };

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="w-5 h-5" />
          Register Teacher
        </CardTitle>
        <CardDescription>Add a new teacher to the system</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="name"
            label="Teacher Name"
            placeholder="Enter teacher's full name"
            control={control}
            error={errors.name}
          />
          <FormField
            name="email"
            label="Email"
            type="email"
            placeholder="Enter teacher's email"
            control={control}
            error={errors.email}
          />
          <FormField
            name="password"
            label="Password"
            type="password"
            placeholder="Enter temporary password"
            control={control}
            error={errors.password}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register Teacher"}
          </Button>
        </form>
      </CardContent>
    </Card>
    </>
 
  );
}
