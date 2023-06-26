import create from 'zustand';

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    userEmail: string | null;
    setAccessToken: (accessToken: string) => void;
    setRefreshToken: (refreshToken: string) => void;
    clearTokens: () => void;
    setUserEmail: (email: string) => void;
    clearUserEmail: () => void;
}
  
const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    refreshToken: null,
    userEmail: null,
    setAccessToken: (accessToken) => set((state) => ({...state, accessToken})),
    setRefreshToken: (refreshToken) => set((state) => ({...state, refreshToken})),
    clearTokens: () => set({ accessToken: null, refreshToken: null }),
    setUserEmail: (email) => set({ userEmail: email }),
    clearUserEmail: () => set({ userEmail: null }),
}));
  
export default useAuthStore;

  