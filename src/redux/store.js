/** @format */

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers"; // Your root reducer file

const store = configureStore({
  reducer: rootReducer,
});
export default store;
