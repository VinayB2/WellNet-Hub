import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { alertsSlice } from "./alertsSlice";
import { userSlice } from "./userSlice";
import cartSlice from "./cartSlice";

const rootReducer = combineReducers({
  alerts: alertsSlice.reducer,
  user : userSlice.reducer,
  allCart: cartSlice
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
