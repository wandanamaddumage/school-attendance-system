import { baseApi } from "../..";
import { Endpoints } from "../../endpoints";

export const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStudent: builder.mutation<any, { name: string; class_id: number }>({
      query: (body) => ({
        url: Endpoints.CreateStudent,
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Students"],
    }),
    getAllStudents: builder.query<any[], void>({
      query: () => ({
        url: Endpoints.GetAllStudents,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["Students"],
    }),
  }),
});

export const { useCreateStudentMutation, useGetAllStudentsQuery } = studentApi;
