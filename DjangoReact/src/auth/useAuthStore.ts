import create from 'zustand';

interface AuthState {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
}
  
const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (value) => set((state) => ({...state, isAuthenticated: value})),
}));
  
export default useAuthStore;

  
