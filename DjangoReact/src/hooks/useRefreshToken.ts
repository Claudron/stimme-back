import axios from 'axios';
import useAuthStore from '../auth/useAuthStore';

const useRefreshToken = () => {
    const { setAccessToken, refreshToken } = useAuthStore();
  
    const refreshTokens = async () => {
      try {
        const response = await axios.post('/auth/jwt/refresh', { refresh: refreshToken }, { withCredentials: true });

        if (response.status === 200) {
          setAccessToken(response.data.access);
          return response.data.access;
        }

      } catch (error) {
        console.error(error);
      }
    };

    return refreshTokens;
}

export default useRefreshToken;
