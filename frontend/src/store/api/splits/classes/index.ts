import { baseApi } from "../..";
import { Endpoints } from "../../endpoints";

export const teacherApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudentsByClass: builder.query<
      any[], 
      { class_id: number }
    >({
      query: ({ class_id }) => ({
        url: `${Endpoints.GetStudentsByClass}?class_id=${class_id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["Students"],
    }),
  }),
});

export const { useGetStudentsByClassQuery } = teacherApi;
