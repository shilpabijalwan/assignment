import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Blog from "../pages/Blog";
import PageNotFound from "../pages/PageNotFound";

import CreateBlogPage from "../pages/CreateBlog";
import EditBlog from "../pages/EditBlog";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={< HomePage/>} />
      <Route path="login" element={<Login />} errorElement={<PageNotFound />} />
      <Route path="signup" element={<SignUp />} errorElement={<PageNotFound />} />
      <Route path="blog/:id" element={<Blog />}  />
      <Route path="edit/:id" element={<EditBlog />} />
      <Route path="create_blog" element={<CreateBlogPage/>} errorElement={<PageNotFound />} />

      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);
