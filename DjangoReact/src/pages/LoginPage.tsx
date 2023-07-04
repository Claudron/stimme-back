import {
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useState } from "react";
import apiClient from "../services/api-client";
import useAuthStore from "../auth/useAuthStore";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setIsAuthenticated } = useAuthStore();

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
      setIsAuthenticated(true);
      setFormData({ email: "", password: "" });
      navigate("/");
    } catch (error) {
      console.error("API error:", error);
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
    </SimpleGrid>
  );
};

export default LoginPage;
