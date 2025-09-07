import { baseApi } from "../..";
import { Endpoints } from "../../endpoints"

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string; user: any }, { email: string; password: string }>({
      query: (body) => ({
        url: Endpoints.Login,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: Endpoints.Logout,
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation } = authApi
