import axios, { AxiosError } from 'axios';
import useLogout from './useLogout';

const useRefreshToken = () => {
  const logout = useLogout();

  const refreshTokens = async () => {
    try {
      const response = await axios.get('/auth/jwt/refresh', { withCredentials: true });

      if (response.status === 200) {
        return response.data.access;
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response && error.response.status === 400) {
        logout();
      }
      console.error(error);
    }
  };

  return refreshTokens;
};

export default useRefreshToken;




