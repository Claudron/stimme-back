import axios from 'axios';

const useLogout = () => {
  const logout = async () => {
    try {
      const response = await axios.post('/auth/logout', { withCredentials: true });

      if (response.status === 200) {
        return response.data.access;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
};

export default useLogout;
