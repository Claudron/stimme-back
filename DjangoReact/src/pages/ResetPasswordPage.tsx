import {
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Text,
  GridItem,
  Box,
  Flex,
} from "@chakra-ui/react";
import React from "react";

const ResetPasswordPage = () => {
  return (
    <Flex height="50vh" justifyContent="center" alignItems="center">
    <Box width="350px" padding={4} borderColor="blackAlpha 50" borderWidth="1px" borderRadius={10}>
      <SimpleGrid padding={2}>
        <GridItem marginBottom={4}>
          <Text fontSize="sm">Forgot your account’s password? </Text>
          <Text fontSize="sm">
            Enter your email address and we’ll send you a recovery link.
          </Text>
        </GridItem>
        <GridItem>
          <form>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" />
            </FormControl>
            <Button marginTop={5}>RecoverPassword</Button>
          </form>
        </GridItem>
      </SimpleGrid>
    </Box>
    </Flex>
  );
};

export default ResetPasswordPage;
