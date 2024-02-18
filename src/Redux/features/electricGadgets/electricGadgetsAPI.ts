/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../../api/baseApi";
interface Dimensions {
  length?: number;
  width?: number;
  height?: number;
}

export interface ElectricGadget {
  data?: any;

  saleDate: Date;
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
  createdBy?: any;
  isDeleted?: boolean;

  updatedAt?: Date;

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

    getSingleElectricGadgets: builder.query<ElectricGadget[], void>({
      query: () => ({
        url: "/single-electric-gadgets",
        method: "GET",
      }),
    }),

    getElectricGadgetById: builder.query<ElectricGadget, string>({
      query: (electricGadgetId) => ({
        url: `/electric-gadgets/${electricGadgetId}`,
        method: "GET",
      }),
    }),

    getSingleElectricGadgetById: builder.query<ElectricGadget, string>({
      query: (electricGadgetId) => ({
        url: `/single-electric-gadgets/${electricGadgetId}`,
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

    addSingleElectricGadget: builder.mutation<
      ElectricGadget,
      Partial<ElectricGadget>
    >({
      query: (newElectricGadget) => ({
        url: "/single-electric-gadgets",
        method: "POST",
        body: newElectricGadget,
      }),
    }),

    addAdminElectricGadget: builder.mutation<
      ElectricGadget,
      Partial<ElectricGadget>
    >({
      query: (newElectricGadget) => ({
        url: "/admin-electric-gadgets",
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

    deleteSingleElectricGadget: builder.mutation<void, string>({
      query: (electricGadgetId) => ({
        url: `/single-electric-gadgets/${electricGadgetId}`,
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

    updateSingleElectricGadget: builder.mutation<
      ElectricGadget,
      { id: string; updatedData: Partial<ElectricGadget> }
    >({
      query: ({ id, updatedData }) => ({
        url: `/single-electric-gadgets/${id}`,
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

    bulkSingleDeleteElectricGadgets: builder.mutation<void, string[]>({
      query: (electricGadgetIds) => ({
        url: "/single-bulk-delete",
        method: "POST",
        body: { electricGadgetIds },
      }),
    }),
  }),
});

export const {
  //Admin
  useAddAdminElectricGadgetMutation,
  //manager
  useAddElectricGadgetMutation,
  //All
  useGetElectricGadgetsQuery,
  useGetElectricGadgetByIdQuery,
  useDeleteElectricGadgetMutation,
  useUpdateElectricGadgetMutation,
  useBulkDeleteElectricGadgetsMutation,

  //single user

  useGetSingleElectricGadgetsQuery,
  useGetSingleElectricGadgetByIdQuery,
  useAddSingleElectricGadgetMutation,
  useDeleteSingleElectricGadgetMutation,
  useUpdateSingleElectricGadgetMutation,
  useBulkSingleDeleteElectricGadgetsMutation,
} = electricGadgetsApi;
