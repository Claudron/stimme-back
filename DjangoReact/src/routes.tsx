import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import Posts from "./pages/PostPage";
import PostDetailPage from "./pages/PostDetailPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import DownloadPage from "./pages/DownloadPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "posts/", element: <Posts /> },
      { path: "dashboard/", element: <DashboardPage /> },
      { path: "download/", element: <DownloadPage /> },
      { path: "login/", element: <LoginPage /> },
      { path: "posts/:id", element: <PostDetailPage /> },
    ],
  },
]);

export default router;
