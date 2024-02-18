/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

export interface Sale {
  _id?: string;
  price: number;
  quantity: number;
  buyerName: string;
  saleDate: Date;
  name: string;
  phoneNumber: string;
  productId?: any;
  image?: string;
  releaseDate: string;
  brand: string;
  modelNumber: string;
  category: string;
}

export const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSalesHistory: builder.query<Sale[], string>({
      query: (period) => ({
        url: `/sales-history/${period}`,
        method: "GET",
      }),
    }),

    getSingleSalesHistory: builder.query<Sale[], string>({
      query: (period) => ({
        url: `/single-sales-history/${period}`,
        method: "GET",
      }),
    }),

    createSale: builder.mutation<Sale, Sale>({
      query: (newSale) => ({
        url: "/sell",
        method: "POST",
        body: newSale,
      }),
    }),
    createAdminSale: builder.mutation<Sale, Sale>({
      query: (newSale) => ({
        url: "/admin-sell",
        method: "POST",
        body: newSale,
      }),
    }),
    createManagerSale: builder.mutation<Sale, Sale>({
      query: (newSale) => ({
        url: "/sells",
        method: "POST",
        body: newSale,
      }),
    }),
  }),
});

export const {
  useGetSalesHistoryQuery,
  useGetSingleSalesHistoryQuery,
  useCreateSaleMutation,
  useCreateManagerSaleMutation,
  useCreateAdminSaleMutation,
} = salesApi;
