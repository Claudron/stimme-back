import create from 'zustand';

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    userEmail: string | null;
    setTokens: (accessToken: string, refreshToken: string) => void;
    clearTokens: () => void;
    setUserEmail: (email: string) => void;
    clearUserEmail: () => void;
  }
  
  const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    refreshToken: null,
    userEmail: null,
    setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
    clearTokens: () => set({ accessToken: null, refreshToken: null }),
    setUserEmail: (email) => set({ userEmail: email }),
    clearUserEmail: () => set({ userEmail: null }),
  }));
  
  export default useAuthStore;
  