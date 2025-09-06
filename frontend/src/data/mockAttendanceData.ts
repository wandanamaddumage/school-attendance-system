import type { DailyAttendance } from "@/types/types";

export const mockAttendanceData: Record<string, DailyAttendance[]> = {
  "Alice Johnson": [
    { date: "2024-01-15", status: "present" },
    { date: "2024-01-16", status: "present" },
    { date: "2024-01-17", status: "absent" },
    { date: "2024-01-18", status: "present" },
    { date: "2024-01-19", status: "present" },
  ],
  "Bob Smith": [
    { date: "2024-01-15", status: "present" },
    { date: "2024-01-16", status: "absent" },
    { date: "2024-01-17", status: "absent" },
    { date: "2024-01-18", status: "present" },
    { date: "2024-01-19", status: "present" },
  ],
};
