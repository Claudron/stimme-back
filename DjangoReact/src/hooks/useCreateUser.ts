import { useMutation } from "@tanstack/react-query";
import User from "../entities/user";
import apiClient from "../services/api-client";

interface CreateUser {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }
  


const createUser = async (userData:CreateUser) => {
    const response = await apiClient.post('/user/register/', userData);
  
    if (response.status === 201) { // Assuming a 201 status code for a successful creation
      return response.data;
    }
  
    if (response.data) {
      throw new Error(response.data.detail);
    }
  
    throw new Error('Error creating user');
  };

  const useCreateUser = () => {
    return useMutation<User, Error,CreateUser>({
      mutationFn: createUser,
      onError: (error) => console.error(error),
    });
  };
  
  export default useCreateUser;