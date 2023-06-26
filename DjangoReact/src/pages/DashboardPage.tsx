import { Button } from "@chakra-ui/react";
import React from "react";
import useRefreshToken from "../hooks/useRefreshToken";

const DashboardPage = () => {
  const refreshTokens = useRefreshToken();

  const handleRefreshClick = async () => {
    try {
      const newAccessToken = await refreshTokens();
      console.log("New Access Token: ", newAccessToken);
    } catch (error) {
      console.error("Failed to refresh tokens: ", error);
    }
  };

  return <Button onClick={handleRefreshClick}>Refresh Tokens</Button>;
};

export default DashboardPage;
