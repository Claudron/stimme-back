import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import useResetPassword from "../hooks/useRestPassword"; // Ensure the correct import path
import { useRef } from "react";
import { useLocation } from "react-router-dom";

const ResetPasswordPage = () => {
  const location = useLocation();
  const path = location.pathname;
  const [_, uid, token] = path.split("/").slice(-3); // Adjust this based on your URL structure

  const newPasswordRef = useRef<HTMLInputElement>(null);
  const reNewPasswordRef = useRef<HTMLInputElement>(null);
  const resetPasswordMutation = useResetPassword();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (uid && token && newPasswordRef.current && reNewPasswordRef.current) {
      const newPassword = newPasswordRef.current.value;
      const reNewPassword = reNewPasswordRef.current.value;

      resetPasswordMutation.mutate(
        { uid, token, new_password: newPassword, re_new_password: reNewPassword },
        {
          onSuccess: () => {
            if (newPasswordRef.current && reNewPasswordRef.current) {
              newPasswordRef.current.value = "";
              reNewPasswordRef.current.value = "";
            }
          },
          onError: () => {
            if (newPasswordRef.current && reNewPasswordRef.current) {
              newPasswordRef.current.value = "";
              reNewPasswordRef.current.value = "";
            }
          },
        }
      );
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      boxShadow="lg"
      marginBottom={5}
    >
      <Heading marginBottom={5}>Reset Password</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>
            New Password:
            <Input ref={newPasswordRef} type="password" name="newPassword" required />
          </FormLabel>
          <FormLabel>
            Repeat New Password:
            <Input ref={reNewPasswordRef} type="password" name="reNewPassword" required />
          </FormLabel>
          <Button type="submit">Reset Password</Button>
        </FormControl>
      </form>
      {resetPasswordMutation.isLoading && <div>Changing password...</div>}
      {resetPasswordMutation.isError && (
        <div>Error: {resetPasswordMutation.error.message}</div>
      )}
      {resetPasswordMutation.isSuccess && (
        <div>Password has been changed successfully</div>
      )}
    </Box>
  );
};

export default ResetPasswordPage;
