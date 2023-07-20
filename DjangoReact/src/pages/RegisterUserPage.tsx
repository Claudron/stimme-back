import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useCreateUser from "../hooks/useCreateUser";
import { Link, useNavigate } from "react-router-dom";

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
      alert("Passwords do not match!");
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
        <Box mt={5}>
          <Text color="green.500">
            User registered successfully! Please Login.
          </Text>
        </Box>
      )}

      {createUserMutation.isError && (
        <Box mt={5}>
          <Text color="red.500">
            An error occurred: {createUserMutation.error.message}
          </Text>
        </Box>
      )}
      <HStack marginTop={3}>
        <Link to="/login">Have an account already? Please log in.</Link>
      </HStack>
    </SimpleGrid>
  );
};

export default RegisterUserPage;