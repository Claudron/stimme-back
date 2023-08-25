import { Link as ChakraLink, HStack, Heading } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import ColrModeSwitch from "./ColorModeSwitch";
import usePlaylistStore from "../store/useExerciseStore";

const NavBar = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const clearPlaylist = usePlaylistStore.getState().clearPlaylist;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      clearPlaylist();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePracticePageNavigation = () => {
    clearPlaylist();
    console.log('Playlist cleard by Link');
  };

  return (
    <HStack justifyContent={"space-between"} padding="10px">
      <Heading>Private</Heading>
      <Link to="/posts">Posts</Link>
      <Link to="/exercise-player" onClick={handlePracticePageNavigation}>
        Practice
      </Link>
      <Link to="/account">Account</Link>
      <ChakraLink onClick={handleLogout}>Logout</ChakraLink>
      <ColrModeSwitch />
    </HStack>
  );
};

export default NavBar;
