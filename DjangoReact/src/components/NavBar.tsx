import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColrModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack justifyContent={"space-between"} padding="10px">
      <Image src={logo} boxSize="60px" />
      <ColrModeSwitch />
    </HStack>
  );
};

export default NavBar;
