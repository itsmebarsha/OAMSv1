/** @format */

// reducers/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    userRole: null,
    userDetail: null,
    // Add other user-related state if needed
  },
  reducers: {
    loginUser: (state, action) => {
      // Set isLoggedIn to true and store user role
      state.isLoggedIn = true;
      state.userRole = action.payload.role;
      state.userDetail = action.payload.userDetail;
    },
    logoutUser: (state) => {
      // Set isLoggedIn to false and clear user role
      state.isLoggedIn = false;
      state.userRole = null;
      state.userDetail = null;
    },
    // Add other actions as needed
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
