/** @format */

// reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  // Add other slices if needed
});

export default rootReducer;
