import { create } from 'zustand';

export interface File {
    id: number;
    direction: string;
    range: string;
    tempo: string;
    file: string;
    exercise_method: number;
}

interface Playlist {
  playlist: File[];
  addToPlaylist: (file: File) => void;
  loadPlaylist: (files: File[]) => void;
  removeFromPlaylist: (fileId: number) => void;
}

const usePlaylistStore = create<Playlist>((set) => ({
  playlist: [],
  addToPlaylist: (file) => set((state) => ({ playlist: [...state.playlist, file] })),
  loadPlaylist: (files) => set({ playlist: files }),
  removeFromPlaylist: (fileId) => set((state) => ({ playlist: state.playlist.filter(file => file.id !== fileId) }))
}));

export default usePlaylistStore;
