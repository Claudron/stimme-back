import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../auth/useAuthStore";
import NavBar from "./NavBar";
import { Box } from "@chakra-ui/react";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <>
      <NavBar />
      <Box padding={5}>
        <Outlet />
      </Box>
      ;
    </>
  );
};

export default PrivateRoute;
