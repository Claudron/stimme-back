import { Box, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import AudioPlayer from "../components/AudioPlayer";
import ExerciseSelector from "../components/ExerciseSelector";
import Playlist from "../components/Playlist";

const DashboardPage = () => {
  return (
    <Grid>
      <GridItem display="flex" alignItems="center" justifyContent="center">
        <AudioPlayer />
      </GridItem>
      <GridItem display="flex" alignItems="center" justifyContent="center">
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

export default DashboardPage;
