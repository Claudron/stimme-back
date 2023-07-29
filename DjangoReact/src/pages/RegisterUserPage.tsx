import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Link as ChakraLink,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link as ReachLink } from "react-router-dom";
import useCreateUser from "../hooks/useCreateUser";

const RegisterUserPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const createUserMutation = useCreateUser();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);

    // Check if password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    createUserMutation.mutate(formData, {
      // Reset form field when mutation is successful
      onSuccess: () => {
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          first_name: "",
          last_name: "",
        });
        setError(null);
      },
    });
  };

  return (
    <Container height="80vh" justifyContent="center" alignItems="center">
      <Flex>
        <Box
          width="500px"
          padding={4}
          borderColor="blackAlpha 50"
          borderWidth="1px"
          borderRadius={10}
        >
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
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </FormControl>
              <Button type="submit" marginTop={5}>
                Register
              </Button>
            </form>
            {createUserMutation.isSuccess && (
              <Alert status="success" mt={5}>
                <AlertIcon />
                <AlertTitle mr={2}>Success:</AlertTitle>
                <AlertDescription>
                  User registered successfully! Please check your inbox for the
                  activation email.
                </AlertDescription>
              </Alert>
            )}

            {createUserMutation.isError && (
              <Alert status="error" mt={5}>
                <AlertIcon />
                <AlertTitle mr={2}>Error:</AlertTitle>
                <AlertDescription>
                  An error occurred: {createUserMutation.error.message}
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert status="error" mt={5}>
                <AlertIcon />
                <AlertTitle mr={2}>Error:</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <HStack mt={3}>
              <Text>Have an account already?</Text>
              <ChakraLink as={ReachLink} to="/login" color="blue.200">
                Please log in.
              </ChakraLink>
            </HStack>
          </SimpleGrid>
        </Box>
      </Flex>
    </Container>
  );
};

export default RegisterUserPage;
