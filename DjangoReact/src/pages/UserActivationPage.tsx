import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useActivateUser from "../hooks/useActivateUser"; // Update the import path to your hook

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
  if (mutation.isLoading) {
    return <div>Activating account...</div>;
  } else if (mutation.isError) {
    // Ensure error is an instance of Error before accessing message property
    const errorMessage =
      mutation.error instanceof Error
        ? mutation.error.message
        : "An error occurred";
    return <div>{errorMessage}</div>;
  } else if (mutation.isSuccess) {
    return <div>Account activated successfully!</div>;
  } else {
    // Default case, when mutation has not started yet
    return null;
  }
};

export default UserActivationPage;
