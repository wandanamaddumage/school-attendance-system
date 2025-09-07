import { baseApi } from "../..";
import { Endpoints } from "../../endpoints";

export const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudentReport: builder.query<any, number>({
      query: (studentId) => ({
        url: `${Endpoints.GetStudentReport}/${studentId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),

    getClassReport: builder.query<any, { class_id: number; month: string }>({
      query: ({ class_id, month }) => ({
        url: `${Endpoints.GetClassReport}?class_id=${class_id}&month=${month}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
  }),
});

export const { 
  useGetStudentReportQuery,
  useGetClassReportQuery 
} = reportApi;
