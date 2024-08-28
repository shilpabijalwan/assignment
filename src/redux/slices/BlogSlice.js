import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs:[],
  selectedBlog:'',
  isLoading:false,
  isError:false
};

const BlogSlice = createSlice({
  name: "blog",
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
    setBlogs(state,{payload}){
        console.log(payload)
        state.blogs = payload
    }
  },
});
export const { Loading, isError,setBlogs } = BlogSlice.actions;

export default BlogSlice.reducer;