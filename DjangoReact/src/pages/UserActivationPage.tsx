import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useActivateUser from "../hooks/useActivateUser"; // Update the import path to your hook
import { Text, AbsoluteCenter, Heading} from "@chakra-ui/react";

interface RouteParams {
  uid: string;
  token: string;
  [key: string]: string | undefined;
}

const UserActivationPage = () => {
  const { uid, token } = useParams<RouteParams>();
  const { mutate, ...mutation } = useActivateUser();

  useEffect(() => {
    if (uid && token) {
      mutate({ uid, token });
    }
  }, [uid, token, mutate]);

  // Handle loading, error, and success states
  let content;
  if (mutation.isLoading) {
    content = <Heading>Activating account...</Heading>;
  } else if (mutation.isError) {
    // Ensure error is an instance of Error before accessing message property
    const errorMessage =
      mutation.error instanceof Error
        ? mutation.error.message
        : "An error occurred";
    content = <Heading>{errorMessage}</Heading>;
  } else if (mutation.isSuccess) {
    content = <Heading>Account activated successfully!</Heading>;
  }

  return (
    <AbsoluteCenter>
      {content}
    </AbsoluteCenter>
  );
};

export default UserActivationPage;
