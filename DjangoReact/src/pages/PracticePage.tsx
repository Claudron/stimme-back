import { Box, Grid, GridItem } from "@chakra-ui/react";
import AudioPlayer from "../components/AudioPlayer";
import ExerciseSelector from "../components/ExerciseSelector";
import Playlist from "../components/Playlist";
import usePlaylistStore from "../store/useExerciseStore";

const PracticePage = () => {
  const playlist = usePlaylistStore((state) => state.playlist);

  return (
    <Grid>
      <GridItem display="flex" alignItems="center" justifyContent="center">
        <AudioPlayer playlist={playlist} />
      </GridItem>
      <GridItem
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginBottom={2}
      >
        <ExerciseSelector />
      </GridItem>
      <GridItem display="flex" alignItems="center" justifyContent="center">
        <Box height="calc(100vh - 150px)" overflowY="auto">
          <Playlist />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default PracticePage;
