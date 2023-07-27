import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";
import apiClient from "../services/api-client";
import { useResendActivationEmail } from "../hooks/useResendActivationEmail";
const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isUserInactive, setIsUserInactive] = useState(false);

  const navigate = useNavigate();
  const resendActivationEmail = useResendActivationEmail();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await apiClient.post("/auth/jwt/create/", formData);
      console.log(response.data);
      setFormData({ email: "", password: "" });
      navigate("/posts");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.detail) {
        let errorMessage = error.response.data.detail;

        if (
          error.response.data.detail ===
          "User is not active, please confirm your email"
        ) {
          setIsUserInactive(true);
        }

        if (
          errorMessage === "No active account found with the given credentials"
        ) {
          errorMessage = "The email or password is incorrect.";
        }

        setError(errorMessage);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <SimpleGrid padding={2}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>
            Password
            <ChakraLink
              as={ReachLink}
              to="/reset-password"
              color="blue.200"
              ml={2}
            >
              Forgot password?
            </ChakraLink>
          </FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" marginTop={5}>
          Login
        </Button>
        {error && <Text color="red.500">{error}</Text>}
        <HStack mt={3}>
        <Text>Don't have an account?</Text>
          <ChakraLink as={ReachLink} to="/register" color="blue.200">
             Please register.
          </ChakraLink>
        </HStack>
        {isUserInactive && (
          <>
            <Text marginTop={5}>
              Resend activation email for: {formData.email} ?
            </Text>
            <Button
              onClick={() =>
                resendActivationEmail.mutate({ email: formData.email })
              }
              marginTop={5}
            >
              Resend
            </Button>
          </>
        )}
      </form>
    </SimpleGrid>
  );
};

export default LoginPage;
