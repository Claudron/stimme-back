import { Box, Grid, GridItem } from "@chakra-ui/react";
import AudioPlayer from "../components/AudioPlayer";
import ExerciseSelector from "../components/ExerciseSelector";
import Playlist from "../components/Playlist";
import usePlaylistStore from "../store/useExerciseStore";
import useSaveExercisePlaylist from "../hooks/useSaveExercisePlaylist";
import useLoadExercisePlaylist from "../hooks/useLoadExercisePlaylist";
import { useEffect } from "react";

interface Playlist {
  playlist: File[];
}

const PracticePage = () => {
  const playlist = usePlaylistStore((state) => state.playlist);
  const savePlaylistMutation = useSaveExercisePlaylist();
  const { data: loadedPlaylist } = useLoadExercisePlaylist();

  useEffect(() => {
    if (loadedPlaylist) {
        usePlaylistStore.getState().loadPlaylist(loadedPlaylist.playlist);
    }
  }, [loadedPlaylist]);

  useEffect(() => {
    console.log("Playlist has changed:", playlist);
    savePlaylistMutation.mutate({ playlist });
  }, [playlist]);


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
      <div>
        {savePlaylistMutation.isLoading && <p>Saving...</p>}
        {savePlaylistMutation.isError && <p>Error saving playlist.</p>}
        {savePlaylistMutation.isSuccess && <p>Playlist saved successfully!</p>}
      </div>
      <GridItem display="flex" alignItems="center" justifyContent="center">
        <Box height="calc(100vh - 150px)" overflowY="auto">
          <Playlist />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default PracticePage;
