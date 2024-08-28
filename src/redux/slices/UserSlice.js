import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:"",
  isLoading:false,
  isError:false
};

const UserSlice = createSlice({
  name: "user",
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
    setUser(state,{payload}){
        state.user = payload
    }
  },
});
export const { Loading, isError,setUser } = UserSlice.actions;

export default UserSlice.reducer;