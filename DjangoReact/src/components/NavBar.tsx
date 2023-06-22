import { HStack, Image } from "@chakra-ui/react";
import ColrModeSwitch from "./ColorModeSwitch";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <HStack justifyContent={"space-between"} padding="10px">
      <Link to="/">Home</Link>
      <Link to="/posts">Posts</Link>
      <ColrModeSwitch />
    </HStack>
  );
};

export default NavBar;
