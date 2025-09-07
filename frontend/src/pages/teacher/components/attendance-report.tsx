import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GRADES } from "@/constants/constants";
import { useGetClassReportQuery } from "@/store/api/splits/reports";
import ClassReport from "@/components/class-report";

export default function AttendanceReports() {
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  const { data: classData, isLoading: classLoading, error: classError } = useGetClassReportQuery(
    { class_id: Number(selectedClass), month: selectedMonth },
    { skip: !selectedClass || !selectedMonth }
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Class</label>
        <Select value={selectedClass} onValueChange={(val) => setSelectedClass(val)}>
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

        <label className="text-sm font-medium">Month</label>
        <Input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </div>

      {selectedClass && selectedMonth && (
        <ClassReport
          selectedClass={selectedClass}
          selectedMonth={selectedMonth}
          classData={classData}
          classLoading={classLoading}
          classError={classError}
        />
      )}
    </div>
  );
}
