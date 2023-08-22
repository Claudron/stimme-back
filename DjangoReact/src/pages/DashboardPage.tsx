import { SimpleGrid } from "@chakra-ui/react";
import AudioPlayer from "../components/AudioPlayer";
import ExerciseSelector from "../components/ExerciseSelector";
import Playlist from "../components/Playlist";

const DashboardPage = () => {
  return (
    <SimpleGrid>
      <AudioPlayer />
      <ExerciseSelector />
      <Playlist />
    </SimpleGrid>
  );
};

export default DashboardPage;
