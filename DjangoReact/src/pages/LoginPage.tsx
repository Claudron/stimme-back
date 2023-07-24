import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../services/api-client";


const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();

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
      navigate("/");
    } catch (error: any) {  // `any` type used for simplicity; consider defining a specific error type
      console.error("API error:", error);
  
      // Check if `error.response`, `error.response.data`, and `error.response.data.detail` exist
      if (error.response && error.response.data && error.response.data.detail) {
        setError(error.response.data.detail);
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
          <FormLabel>Password</FormLabel>
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
      </form>
      {error && <Text color="red.500">{error}</Text>}
      <HStack marginTop={3}>
        <Link to="/register">Dont have an account? Please register.</Link>
      </HStack>
    </SimpleGrid>
  );
};

export default LoginPage;
