import create from 'zustand';

interface AuthState {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
}
  
const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: true, // set to true for now to enable consisten login!!!
    setIsAuthenticated: (value) => set((state) => ({...state, isAuthenticated: value})),
}));
  
export default useAuthStore;

  
