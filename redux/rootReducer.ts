import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import loaderReducer from "./loaderSlice";


const rootReducer = combineReducers({
  auth: authSlice,
  loader: loaderReducer,

});

export default rootReducer;
