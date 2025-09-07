import { baseApi } from "../..";
import { Endpoints } from "../../endpoints"

export const teacherApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTeacher: builder.mutation<any, { name: string; email: string; password: string}>({
      query: (body) => ({
        url: Endpoints.CreateTeacher,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Teachers"],
    }),
    getAllTeachers: builder.query<any[], void>({
      query: () => ({ url: Endpoints.GetAllTeachers }),
      providesTags: ["Teachers"],
    }),
  }),
})

export const { useCreateTeacherMutation, useGetAllTeachersQuery } = teacherApi
