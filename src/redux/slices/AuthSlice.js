import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
};

const AuthSlice = createSlice({
  name: "auth slice",
  initialState,
  reducers: {
    Loading(state, action) {
      console.log(action);
      state.isLoading = action.payload;
    },
    isError(state) {
      state.isLoading = false;
      state.isError = true;
    },
  },
});
export const { Loading, isError } = AuthSlice.actions;

export default AuthSlice.reducer;