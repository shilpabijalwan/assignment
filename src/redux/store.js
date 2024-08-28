
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import BlogSlice from "./slices/BlogSlice";
import UserSlice from "./slices/UserSlice";


const rootReducer = combineReducers({
  auth: AuthSlice,
  blogs: BlogSlice,
  user: UserSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
