import { useMutation } from '@tanstack/react-query';
import apiClient from '../services/api-client';

interface RestPasswordData {
  uid:string;
  token: string  
  new_password: string;
  re_new_password: string;
}

const resetPassword = async (resetPasswordData: RestPasswordData) => {
    const response = await apiClient.post('/auth/users/reset_password_confirm/', resetPasswordData);
  
    if (response.status === 204) {
      return true;
    }
  
    if (response.data) {
      throw new Error(response.data.detail);
    }
  
    throw new Error('Error changing password');
  }

  const useResetPassword = () => {
    return useMutation<boolean, Error, RestPasswordData>({
      mutationFn: resetPassword,
      onError: (error) => console.error(error),
    });
  }

  export default useResetPassword;