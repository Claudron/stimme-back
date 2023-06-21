import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import Posts from "./pages/PostPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "posts/", element: <Posts /> },
      // { path: "videos/:id", element: <PostDetailPage /> },
    ],
  },
]);

export default router;
