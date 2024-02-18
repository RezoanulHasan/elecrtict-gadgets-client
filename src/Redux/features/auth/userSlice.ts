import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./userApi";

interface UserState {
  users: User[];
  selectedUser: User | null;
  token: null | string;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  token: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAllUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setAllUsers, setSelectedUser } = userSlice.actions;

export default userSlice.reducer;
