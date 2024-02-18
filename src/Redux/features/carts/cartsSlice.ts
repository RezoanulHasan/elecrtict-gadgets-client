// src/features/electricGadgets/cartsSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, useGetCartByIdQuery } from "./cartApi";

interface CartsState {
  carts: Cart[];
  selectedCart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartsState = {
  carts: [],
  selectedCart: null,
  loading: false,
  error: null,
};

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    getCartsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getCartsSuccess(state, action: PayloadAction<Cart[]>) {
      state.carts = action.payload;
      state.loading = false;
      state.error = null;
    },
    getCartsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCartStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteCartSuccess(state, action: PayloadAction<string>) {
      state.carts = state.carts.filter((cart) => cart._id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteCartFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addCartStart(state) {
      state.loading = true;
      state.error = null;
    },
    addCartSuccess(state, action: PayloadAction<Cart>) {
      state.carts.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    addCartFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    getCartByIdStart(state) {
      state.loading = true;
      state.error = null;
    },
    getCartByIdSuccess(state, action: PayloadAction<Cart>) {
      state.selectedCart = action.payload;
      state.loading = false;
      state.error = null;
    },
    getCartByIdFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateCartStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateCartSuccess(state, action: PayloadAction<Cart>) {
      state.carts = state.carts.map((cart) =>
        cart._id === action.payload._id ? action.payload : cart
      );
      state.loading = false;
      state.error = null;
    },
    updateCartFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateCartQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      const index = state.carts.findIndex((cart) => cart._id === id);
      if (index !== -1) {
        state.carts[index] = {
          ...state.carts[index],
          quantity: quantity,
        };
      }
    },
  },
});

// Exporting the actions directly
export const {
  updateCartStart,
  updateCartSuccess,
  updateCartFailure,
  getCartsStart,
  getCartsSuccess,
  getCartsFailure,
  deleteCartStart,
  deleteCartSuccess,
  deleteCartFailure,
  addCartStart,
  addCartSuccess,
  addCartFailure,
  getCartByIdStart,
  getCartByIdSuccess,
  getCartByIdFailure,
  updateCartQuantity,
} = cartsSlice.actions;

// Asynchronous action to fetch a cart by ID
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchCartById = (cartId: string) => async (dispatch: any) => {
  try {
    dispatch(getCartByIdStart());

    // Use the hook to fetch the cart by ID
    const result = await useGetCartByIdQuery(cartId);

    if (result.error) {
      throw new Error(result.error.toString());
    }

    if (result.data) {
      // Use the 'data' property from the result
      const cartData: Cart = result.data;
      dispatch(getCartByIdSuccess(cartData));
    } else {
      throw new Error("Failed to fetch cart by ID");
    }
  } catch (error) {
    dispatch(getCartByIdFailure(toString()));
  }
};

export default cartsSlice.reducer;
