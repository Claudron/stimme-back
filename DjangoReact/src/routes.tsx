import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import DashboardPage from "./pages/DashboardPage";
import DownloadPage from "./pages/DownloadPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import PostDetailPage from "./pages/PostDetailPage";
import Posts from "./pages/PostPage";
import RegisterUserPage from "./pages/RegisterUserPage";
import UserAccountPage from "./pages/UserAccountPage";
import UserActivationPage from "./pages/UserActivationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login/", element: <LoginPage /> },
      { path: "register/", element: <RegisterUserPage /> },
      { path: "activate/:uid/:token", element: <UserActivationPage /> },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      { path: "posts/", element: <Posts /> },
      { path: "posts/:id", element: <PostDetailPage /> },
      { path: "dashboard/", element: <DashboardPage /> },
      { path: "download/", element: <DownloadPage /> },
      { path: "account/", element: <UserAccountPage /> },
    ],
  },
]);

export default router;
