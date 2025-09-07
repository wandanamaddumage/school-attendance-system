import {
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { getAccessToken, handleForceLogout, handleRefreshTokenProcess } from "@/utils/auth";
import { Endpoints } from "./endpoints";

const ENDPOINTS_TO_AVOID_RETRY = [Endpoints.Login];

const staggeredBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getAccessToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Accept", "application/json"); // 👈 ensures Laravel returns JSON
      return headers;
    },
  }),
  {
    retryCondition: (error: FetchBaseQueryError | any, baseQueryArgs, { attempt }) => {
      if (ENDPOINTS_TO_AVOID_RETRY.includes(baseQueryArgs.url)) return false;
      if (attempt > 3) return false;
      return error.status === "TIMEOUT_ERROR" || error.status === "FETCH_ERROR" || (typeof error.status === "number" && error.status >= 500);
    },
  }
);

const baseQueryWithAuth: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await staggeredBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401 && args?.url !== Endpoints.Login) {
    const isTokenRefreshed = await handleRefreshTokenProcess();
    if (isTokenRefreshed) {
      result = await staggeredBaseQuery(args, api, extraOptions);
    } else {
      handleForceLogout();
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Auth", "Teachers", "Classes", "Students", "Attendance", "Reports"],
  endpoints: () => ({}),
});
