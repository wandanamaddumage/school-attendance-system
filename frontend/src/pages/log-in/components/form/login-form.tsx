import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Mail, Lock } from "lucide-react";
import { loginSchema, type LoginSchema } from "./schema";
import { FormField } from "@/components/form/input/input-field";
import { useLoginMutation } from "@/store/api/splits/auth";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/auth";
import { useNavigate } from "react-router-dom";
import type { User } from "@/App";

interface LoginFormProps {
  onLogin: (user: User) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const { handleSubmit, control, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const response = await login(data).unwrap();

      dispatch(setCredentials({ token: response.token, user: response.user }));

      onLogin(response.user);

      if (response.user.role === "admin") {
        navigate("/admin", { replace: true });
      } else if (response.user.role === "teacher") {
        navigate("/teacher", { replace: true });
      }

    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">School Attendance System</CardTitle>
            <CardDescription>Sign in to manage attendance and student records</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
              control={control}
              error={errors.email}
              icon={<Mail className="h-4 w-4" />}
            />
            <FormField
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
              control={control}
              error={errors.password}
              icon={<Lock className="h-4 w-4" />}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {error && (
            <p className="text-red-500 text-sm mt-2">
              {("data" in error && (error as any).data?.message) || "Login failed"}
            </p>
          )}

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">Test Credentials:</p>
            <div className="text-xs space-y-1 text-muted-foreground">
              <p><strong>Admin:</strong> admin@school.com / password123</p>
              <p><strong>Teacher:</strong> teacher@school.com / password123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
