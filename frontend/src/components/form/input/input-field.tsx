import { Controller } from "react-hook-form"
import type { Control, FieldError } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormFieldProps {
  name: string
  label: string
  placeholder?: string
  type?: string
  control: Control<any>
  error?: FieldError
  icon?: React.ReactNode
}

export function FormField({ name, label, placeholder, type = "text", control, error, icon }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <div className="relative">
        {icon && <span className="absolute left-3 top-3 h-4 w-4 text-muted-foreground">{icon}</span>}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              className={icon ? "pl-10" : ""}
            />
          )}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  )
}
