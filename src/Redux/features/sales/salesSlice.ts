import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Sale } from "./salesApi"; // Import the Sale interface from salesApi.ts

interface SalesState {
  salesHistory: Sale[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SalesState = {
  salesHistory: [],
  isLoading: false,
  error: null,
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    getSalesHistoryStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    getSalesHistorySuccess(state, action: PayloadAction<Sale[]>) {
      state.salesHistory = action.payload;
      state.isLoading = false;
    },
    getSalesHistoryFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    createSaleStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    createSaleSuccess(state, action: PayloadAction<Sale>) {
      state.salesHistory.push(action.payload);
      state.isLoading = false;
    },
    createSaleFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  getSalesHistoryStart,
  getSalesHistorySuccess,
  getSalesHistoryFailure,
  createSaleStart,
  createSaleSuccess,
  createSaleFailure,
} = salesSlice.actions;

export default salesSlice.reducer;
