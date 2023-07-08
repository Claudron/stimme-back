import { useMutation } from '@tanstack/react-query';
import apiClient from '../services/api-client';

interface ChangeEmailData {
  new_email: string;
}

const changeEmail = async (emailData: ChangeEmailData) => {
  const response = await apiClient.post('/auth/users/set_email/', emailData, { withCredentials: true });

  if (response.status === 204) {
    return true;
  }

  throw new Error('Error changing email');
}

const useChangeEmail = () => {
  return useMutation<boolean, Error, ChangeEmailData>({
    mutationFn: changeEmail,
    onError: (error) => console.error(error),
  });
}

export default useChangeEmail;
