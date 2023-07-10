import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api-client';
import User from '../entities/user';
import useUserDataStore from '../store/useUserDataStore';



const fetchUserData = async () => {
  const response = await apiClient.get<User>('/auth/users/me', { withCredentials: true });

  if (response.status === 200) {
      console.log(response.data)
      return response.data;
  }

  throw new Error('Error fetching user data');
}

const useUserData = () => {
  // const userDataStore = useUserDataStore();

  return useQuery<User, Error>(['userData'], {
      queryFn: fetchUserData,
      // onSuccess(data) {
      //   userDataStore.setEmail(data.email);
      //   userDataStore.setFirstName(data.first_name);
      //   userDataStore.setLastName(data.last_name);
      // },
      onError: (error) => console.error(error),
      
  });
}

export default useUserData;



