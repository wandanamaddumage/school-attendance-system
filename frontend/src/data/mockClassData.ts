import type { ClassData } from "@/types/types";
  
export const mockClassData: Record<string, ClassData> = {
  "Grade 5-A": {
    totalDays: 20,
    averageAttendance: 94.2,
    students: [
      { name: "Alice Johnson", attendance: 95 },
      { name: "Bob Smith", attendance: 88 },
      { name: "Charlie Brown", attendance: 97 },
    ],
  },
  "Grade 5-B": {
    totalDays: 20,
    averageAttendance: 91.5,
    students: [
      { name: "Carol Davis", attendance: 92 },
      { name: "Edward Norton", attendance: 89 },
      { name: "Fiona Green", attendance: 94 },
    ],
  },
};
  