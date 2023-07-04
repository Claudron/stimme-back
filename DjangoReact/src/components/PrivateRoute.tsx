import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { Box } from "@chakra-ui/react";
import usePersistLogin from "../hooks/usePersistLogin";

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = usePersistLogin();

  if (isLoading) {
    return null; // maybe loading spinner or other placeholder component later
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <NavBar />
      <Box padding={5}>
        <Outlet />
      </Box>
    </>
  );
};

export default PrivateRoute;
