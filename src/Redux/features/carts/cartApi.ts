/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/electricGadgets/electricGadgetsAPI.ts

import { baseApi } from "../../api/baseApi";
interface Dimensions {
  length?: number;
  width?: number;
  height?: number;
}

export interface Cart {
  _id?: any;
  id?: any;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  releaseDate: string;
  brand: string;
  modelNumber: string;
  category: string;
  operatingSystem?: string;
  connectivity?: string;
  powerSource?: string;
  features?: string[];
  weight?: number;
  dimensions?: Dimensions;
  compatibleAccessories?: string[];
  createdCart?: any; // You may replace 'any' with the appropriate type
  isDeleted?: boolean;
  saleDate?: any;
  updatedAt?: Date;
  product?: any;

  createdBy?: {
    _id: string;
    username: string;
    phoneNumber?: string;
    email: string;
    userImage?: string;
    role: string;
  };
}

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCarts: builder.query<Cart[], void>({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),
    }),

    deleteCart: builder.mutation<void, string>({
      query: (cartId) => ({
        url: `/cart/${cartId}`,
        method: "DELETE",
      }),
    }),
    getCartById: builder.query<Cart, string>({
      query: (cartId) => ({
        url: `/cart/${cartId}`,
        method: "GET",
      }),
    }),

    updateCart: builder.mutation<
      Cart,
      { id: string; updatedData: Partial<Cart> }
    >({
      query: ({ id, updatedData }) => ({
        url: `/cart/${id}`,
        method: "PUT",
        body: updatedData,
      }),
    }),

    addCart: builder.mutation<Cart, Cart>({
      query: (newCart) => ({
        url: "/cart",
        method: "POST",
        body: newCart,
      }),
    }),
  }),
});

export const {
  useDeleteCartMutation,
  useAddCartMutation,
  useGetCartsQuery,
  useGetCartByIdQuery,
  useUpdateCartMutation,
} = cartApi;
