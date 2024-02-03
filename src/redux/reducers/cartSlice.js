/** @format */

// reducers/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    // Add other cart-related state if needed
  },
  reducers: {
    addToCart: (state, action) => {
      // Add the item to the cart
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      // Remove the item from the cart
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    // Add other actions as needed
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
