import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users:[],
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
    setUsers(state,{payload}){
        state.users = payload
    }
  },
});
export const { Loading, isError,setUsers } = UserSlice.actions;

export default UserSlice.reducer;