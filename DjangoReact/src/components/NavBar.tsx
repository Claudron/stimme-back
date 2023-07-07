import { Link as ChakraLink, HStack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import ColrModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogout = async () => {
    try {
      await logout();
      // resetUserData.setIsAuthenticated(false);
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
      <Link to="/account">Account</Link>
      <ChakraLink onClick={handleLogout}>Logout</ChakraLink>
      <ColrModeSwitch />
    </HStack>
  );
};

export default NavBar;
