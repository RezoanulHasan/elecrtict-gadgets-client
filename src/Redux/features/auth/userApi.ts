/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

export interface User {
  _id?: any;
  username: string;
  password: string;
  email: string;
  phoneNumber?: string;
  userImage?: string;
  role?: string;
  passwordChangeHistory?: any;
  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
  users?: any;
  data?: any;
}

// Integrate with baseApi
const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Map superAdminController routes to authApi
    allUsers: builder.query<User[], void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    getUserById: builder.query<User[], string>({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "GET",
      }),
    }),
    deleteUserById: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "DELETE",
      }),
    }),
    updateUserById: builder.mutation<
      User,
      { userId: string; updatedUserData: Partial<User> }
    >({
      query: ({ userId, updatedUserData }) => ({
        url: `/user/${userId}`,
        method: "PUT",
        body: updatedUserData,
      }),
    }),
    promoteUser: builder.mutation({
      query: (userId) => ({
        url: `/promote/${userId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useAllUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserByIdMutation,
  useUpdateUserByIdMutation,
  usePromoteUserMutation,
} = userApi;
