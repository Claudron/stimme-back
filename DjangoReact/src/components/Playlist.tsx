import usePlaylistStore from "../store/useExerciseStore";
import { Button, List, ListItem } from "@chakra-ui/react";
import { File } from "../store/useExerciseStore";
import React from "react";


const Playlist = () => {
    const playlist = usePlaylistStore(s => s.playlist);
    const removeFromPlaylist = usePlaylistStore(s => s.removeFromPlaylist);
    
    console.log(playlist);
    
  return (
    <List>
       
      {playlist?.map((data: File) => (
         
            <React.Fragment key={data.id}>
             <ListItem >
            {data.file}
            <Button onClick={() => removeFromPlaylist(data.id)}>Remove</Button>
            </ListItem>

            </React.Fragment>
      ))}
    </List>
  );
};

export default Playlist;
