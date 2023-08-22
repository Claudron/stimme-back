import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid'; 

export interface File {
    id: number; // This is the original ID of the file
    uniqueId: string; // This is the unique ID for the playlist item (now a string)
    file: string;
    ExerciseName: string;
    methodName: string;
    range: string;
    direction: string;
    tempo: string;
}

interface Playlist {
  playlist: File[];
  addToPlaylist: (file: File) => void;
  loadPlaylist: (files: File[]) => void;
  removeFromPlaylist: (uniqueId: string) => void; 
}

const usePlaylistStore = create<Playlist>((set) => ({
  playlist: [],
  addToPlaylist: (file) => set((state) => {
    const newFile = {
      ...file,
      uniqueId: uuidv4() // Generate a unique ID
    };
    return {
      playlist: [...state.playlist, newFile]
    };
  }),
  loadPlaylist: (files) => set({ playlist: files }),
  removeFromPlaylist: (uniqueId) => set((state) => ({ 
    playlist: state.playlist.filter(file => file.uniqueId !== uniqueId) 
  }))
}));

export default usePlaylistStore;
