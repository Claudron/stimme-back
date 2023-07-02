import axios from 'axios';

const useRefreshToken = () => {
  const refreshTokens = async () => {
    try {
      const response = await axios.get('/auth/jwt/refresh', { withCredentials: true });

      if (response.status === 200) {
        return response.data.access;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return refreshTokens;
};

export default useRefreshToken;
