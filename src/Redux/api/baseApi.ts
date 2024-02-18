/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";

// Define the baseQuery function
const baseQuery: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (
  args,
  api,
  extraOptions
): Promise<any> => {
  // Use fetchBaseQuery to make HTTP requests
  const result = await fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = (api.getState() as RootState).auth.token;

      if (token) {
        headers.set("authorization", `${token}`);
      }

      return headers;
    },
  })(args, api, extraOptions);

  // Handle token refresh if the request returns a 401 status
  if (result?.error?.status === 401) {
    console.log("Sending refresh token");

    const res = await fetch("http://localhost:5000/api/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      // Retry the original request after token refresh
      const refreshedResult = await fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",
        credentials: "include",
        prepareHeaders: (headers) => {
          const token = (api.getState() as RootState).auth.token;

          if (token) {
            headers.set("authorization", `${token}`);
          }

          return headers;
        },
      })(args, api, extraOptions);

      // Use the refreshed result
      return refreshedResult;
    } else {
      // If token refresh fails, dispatch logout
      api.dispatch(logout());
    }
  }

  return result;
};

// Define baseQueryWithRefreshToken using the original baseQuery
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  // Use the original baseQuery
  const result = await baseQuery(args, api, extraOptions);

  // Handle additional logic if needed

  return result;
};

// Create the baseApi using baseQueryWithRefreshToken
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken, // Use baseQueryWithRefreshToken here
  endpoints: () => ({}),
});
