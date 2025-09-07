import { baseApi } from "../..";
import { Endpoints } from "../../endpoints";

export const attendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    markAttendance: builder.mutation<
      any,
      {
        class_id: number;
        date: string;
        attendances: { student_id: number; status: "present" | "absent" }[];
      }
    >({
      query: (body) => ({
        url: Endpoints.MarkAttendance,
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Attendance"],
    }),
  }),
});

export const { useMarkAttendanceMutation } = attendanceApi;
