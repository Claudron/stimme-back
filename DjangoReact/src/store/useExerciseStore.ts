import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid'; 

export interface File {
    id: number;
    uniqueId: string;
    file: string;
    ExerciseName: string;
    methodName: string;
    range: string;
    direction: string;
    tempo: string;
}

interface Playlist {
  playlist: File[];
  currentTrackIndex: number; 
  addToPlaylist: (file: File) => void;
  loadPlaylist: (files: File[]) => void;
  removeFromPlaylist: (uniqueId: string) => void;
  setCurrentTrackIndex: (index: number) => void;
  incrementTrackIndex: () => void;
  decrementTrackIndex: () => void; 
}

const usePlaylistStore = create<Playlist>((set) => ({
  playlist: [],
  currentTrackIndex: 0,
  addToPlaylist: (file) => {
    const newFile = { ...file, uniqueId: uuidv4() };
    set((state) => ({
      playlist: [...state.playlist, newFile],
      currentTrackIndex: state.playlist.length === 0 ? 0 : state.currentTrackIndex,
    }));
  },
  loadPlaylist: (files) => {
    set({ playlist: files, currentTrackIndex: 0 });
  },
  removeFromPlaylist: (uniqueId) => {
    set((state) => {
      const newPlaylist = state.playlist.filter(file => file.uniqueId !== uniqueId);
      let newIndex = state.currentTrackIndex;
      
      if (state.playlist[state.currentTrackIndex].uniqueId === uniqueId) {
        newIndex = Math.max(0, state.currentTrackIndex - 1);
      }
      
      return {
        playlist: newPlaylist,
        currentTrackIndex: newIndex,
      };
    });
  },
  setCurrentTrackIndex: (index) => {
    set({ currentTrackIndex: index });
  },
  incrementTrackIndex: () => {
    set((state) => ({ 
      currentTrackIndex: Math.min(state.playlist.length - 1, state.currentTrackIndex + 1) 
    }));
  },
  decrementTrackIndex: () => {
    set((state) => ({ 
      currentTrackIndex: Math.max(0, state.currentTrackIndex - 1) 
    }));
  },
}));

export default usePlaylistStore;
