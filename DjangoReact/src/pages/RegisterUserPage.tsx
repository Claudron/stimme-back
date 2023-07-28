import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  SimpleGrid,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useCreateUser from "../hooks/useCreateUser";
import { Link, useNavigate } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

const RegisterUserPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
  });

  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const createUserMutation = useCreateUser();
  const navigate = useNavigate();
  

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
        setTimeout(() => {
          navigate("/login");
        }, 2500);
      },
      // Optionally, reset form field even when the mutation fails
      onError: () => {
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          first_name: "",
          last_name: "",
        });
      },
    });
  };

  return (
    <Flex height="50vh" justifyContent="center" alignItems="center">
    <Box width="450px" padding={4} borderColor="blackAlpha 50" borderWidth="1px" borderRadius={10}>
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
          <AlertDescription>User registered successfully! Please Login.</AlertDescription>
        </Alert>
      )}

      {createUserMutation.isError && (
        <Alert status="error" mt={5}>
          <AlertIcon />
          <AlertTitle mr={2}>Error:</AlertTitle>
          <AlertDescription>An error occurred: {createUserMutation.error.message}</AlertDescription>
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
  );
};

export default RegisterUserPage;
