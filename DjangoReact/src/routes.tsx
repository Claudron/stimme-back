import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import Posts from "./pages/PostPage";
import PostDetailPage from "./pages/PostDetailPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import DownloadPage from "./pages/DownloadPage";
import PrivateRoute from "./components/PrivateRoute";
import UserAccount from "./pages/UserAccount";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login/", element: <LoginPage /> },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      { path: "posts/", element: <Posts /> },
      { path: "posts/:id", element: <PostDetailPage /> },
      { path: "dashboard/", element: <DashboardPage /> },
      { path: "download/", element: <DownloadPage /> },
      { path: "account/", element: <UserAccount /> },
    ],
  },
]);

export default router;
