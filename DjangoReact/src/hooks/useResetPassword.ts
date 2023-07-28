import { useMutation } from '@tanstack/react-query';
import apiClient from '../services/api-client';

interface Email {
    email: string;
  }

const useResetPassword = async (data: Email) => {

    const response = await apiClient.post("/auth/users/reset_password/", data);
  
  if (response.status === 204) { 
    return response.data;
  }
  
  if (response.data) {
    throw new Error(response.data.detail);
  }
  
  throw new Error('Error resending activation email');
  
};

export const useResetPassword = () => {
    // const navigate = useNavigate();

  return useMutation({
    mutationFn: useResetPassword,
    // onSuccess: () => {
    // navigate("/resend_activation");
    //   },
    onError: (error: any) => {
      console.error("Error resending activation email:", error);
    },
  });
};