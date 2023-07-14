import {
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useCreateUser from "../hooks/useCreateUser";

const RegisterUserPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "", // New field
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
          confirmPassword: "", // Reset this field too
          first_name: "",
          last_name: "",
        });
      },
      // Optionally, reset form field even when the mutation fails
      onError: () => {
        setFormData({
          email: "",
          password: "",
          confirmPassword: "", // Reset this field too
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
    </SimpleGrid>
  );
};

export default RegisterUserPage;
