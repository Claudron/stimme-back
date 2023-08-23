import usePlaylistStore from "../store/useExerciseStore";
import {
  Badge,
  Button,
  Heading,
  List,
  ListItem,
  useTheme,
} from "@chakra-ui/react";
import { File } from "../store/useExerciseStore";
import React from "react";

const Playlist = () => {
  const playlist = usePlaylistStore((s) => s.playlist);
  const removeFromPlaylist = usePlaylistStore((s) => s.removeFromPlaylist);
  const currentPlayingIndex = usePlaylistStore(
    (state) => state.currentTrackIndex
  );
  const setCurrentTrackIndex = usePlaylistStore((s) => s.setCurrentTrackIndex); // <-- Extract this from the store
  const theme = useTheme(); // <-- get the theme
  const selectedItemColor = theme.colors.teal[100];
  const LstItemHover = theme.colors.gray[600];

  console.log(playlist);

  const moveItemUp = usePlaylistStore((s) => s.moveItemUp);
  const moveItemDown = usePlaylistStore((s) => s.moveItemDown);


  return (
    <List>
      {playlist?.map((data: File, index: number) => (
        <React.Fragment key={data.uniqueId}>
          <ListItem
            style={
              index === currentPlayingIndex
                ? {
                    border: `1px solid ${selectedItemColor}`,
                    borderRadius: "2px",
                    padding: "4px",
                  }
                : {}
            }
            onClick={() => setCurrentTrackIndex(index)}
            _hover={{ backgroundColor: LstItemHover }}
          >
            {" "}
            <Heading as="h3" size="lg">
              {data.ExerciseName}
            </Heading>
            <Heading as="h5" size="sm">
              {data.methodName}
            </Heading>
            <Badge colorScheme="green" marginRight={1}>
              RANGE:
            </Badge>
            {data.range}
            <Badge colorScheme="green" marginLeft={3} marginRight={1}>
              {" "}
              DIRECTION:
            </Badge>
            {data.direction}
            <Badge colorScheme="green" marginLeft={3} marginRight={1}>
              TEMPO:
            </Badge>
            {data.tempo}
            <Button size="sx" onClick={() => moveItemUp(index)}>Move Up</Button>
            <Button size="sx" onClick={() => moveItemDown(index)}>Move Down</Button>
            <Button
              marginLeft={3}
              onClick={() => removeFromPlaylist(data.uniqueId)}
            >
              Remove
            </Button>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
};

export default Playlist;
