/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/electricGadgets/electricGadgetsAPI.ts

import { baseApi } from "../../api/baseApi";
interface Dimensions {
  length?: number;
  width?: number;
  height?: number;
}

export interface ElectricGadget {
  _id?: any;
  id?: any;
  name: string;
  price: number;
  image: string;
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
  createdBy?: any; // You may replace 'any' with the appropriate type
  isDeleted?: boolean;
  createdAt: Date;
  updatedAt?: Date;
  data: any;
  product?: any;
}

export const electricGadgetsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getElectricGadgets: builder.query<ElectricGadget[], void>({
      query: () => ({
        url: "/electric-gadgets",
        method: "GET",
      }),
    }),
    addElectricGadget: builder.mutation<
      ElectricGadget,
      Partial<ElectricGadget>
    >({
      query: (newElectricGadget) => ({
        url: "/electric-gadgets",
        method: "POST",
        body: newElectricGadget,
      }),
    }),
    deleteElectricGadget: builder.mutation<void, string>({
      query: (electricGadgetId) => ({
        url: `/electric-gadgets/${electricGadgetId}`,
        method: "DELETE",
      }),
    }),
    updateElectricGadget: builder.mutation<
      ElectricGadget,
      { id: string; updatedData: Partial<ElectricGadget> }
    >({
      query: ({ id, updatedData }) => ({
        url: `/electric-gadgets/${id}`,
        method: "PUT",
        body: updatedData,
      }),
    }),
    bulkDeleteElectricGadgets: builder.mutation<void, string[]>({
      query: (electricGadgetIds) => ({
        url: "/bulk-delete",
        method: "POST",
        body: { electricGadgetIds },
      }),
    }),
  }),
});

export const {
  useGetElectricGadgetsQuery,
  useAddElectricGadgetMutation,
  useDeleteElectricGadgetMutation,
  useUpdateElectricGadgetMutation,
  useBulkDeleteElectricGadgetsMutation,
} = electricGadgetsApi;
