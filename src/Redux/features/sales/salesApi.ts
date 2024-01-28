/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

export interface Sale {
  _id?: string;
  price: number;
  quantity?: number;
  buyerName?: string;
  saleDate?: Date;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  productId?: any;
}

export const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSalesHistory: builder.query<Sale[], string>({
      query: (period) => ({
        url: `sales-history/${period}`, // Corrected URL
        method: "GET",
      }),
    }),
    createSale: builder.mutation<Sale, Sale>({
      query: (newSale) => ({
        url: "/sell", // Adjust as needed based on your API configuration
        method: "POST",
        body: newSale,
      }),
    }),
  }),
});

export const { useGetSalesHistoryQuery, useCreateSaleMutation } = salesApi;
