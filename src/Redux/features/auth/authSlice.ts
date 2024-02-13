// Import necessary dependencies and types
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// Define the user type based on the backend response
export type TUser = {
  _id: string;
  username: string;
  email: string;
  role: string;
};

// Define the authentication state type
type TAuthState = {
  user: null | TUser;
  token: null | string;
};

// Set the initial state
const initialState: TAuthState = {
  user: null,
  token: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setUser: (state, action: PayloadAction<{ token: string; user: any }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Export the actions, reducer, and selector
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
export const useCurrentToken = (state: RootState) => state.auth.token;
