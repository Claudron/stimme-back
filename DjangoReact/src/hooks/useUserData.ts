import apiClient from '../services/api-client';

const useUserData = () => {
    const userData = async () => {
        try {
          const response = await apiClient.get('/auth/users/me', { withCredentials: true });
    
          if (response.status === 200) {
            console.log(response.data)
            return response.data.access;
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      return userData;
}

export default useUserData