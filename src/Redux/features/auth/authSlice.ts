// Import necessary dependencies and types
import { createSlice } from "@reduxjs/toolkit";
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
    setUser: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
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
