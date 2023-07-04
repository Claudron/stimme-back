import { HStack, Text } from "@chakra-ui/react";
import ColrModeSwitch from "./ColorModeSwitch";
import { Link, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import useAuthStore from "../auth/useAuthStore";
import useLogout from "../hooks/useLogout";

const NavBar = () => {
  const { isAuthenticated } = useAuthStore();
  const resetUserData = useAuthStore();
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogout = async () => {
    try {
      await logout();
      resetUserData.setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HStack justifyContent={"space-between"} padding="10px">
      <Link to="/">Home</Link>
      <Link to="/posts">Posts</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/download">Downloads</Link>
      {!isAuthenticated && <Link to="/login">Login</Link>}
      {isAuthenticated && <Text>Hello There Student</Text>}
      {isAuthenticated && (
        <ChakraLink onClick={handleLogout}>Logout</ChakraLink>
      )}
      <ColrModeSwitch />
    </HStack>
  );
};

export default NavBar;
