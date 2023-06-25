// useUserData.ts
import apiClient from '../services/api-client';
import useAuthStore from '../auth/useAuthStore';

const useUserData = async () => {
  const accessToken = useAuthStore(state => state.accessToken);
  const setUserEmail = useAuthStore(state => state.setUserEmail);
  const clearTokens = useAuthStore(state => state.clearTokens);

  if (accessToken) {
    try {
      const response = await apiClient.get('/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      setUserEmail(response.data.email);
    } catch (error) {
      console.error('Failed to fetch user data', error);
      clearTokens();
    }
  }
};

export default useUserData;
