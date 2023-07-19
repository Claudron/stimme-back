import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/api-client";

interface Params {
  uid: string;
  token: string;
}

const useActivateUser = () => useMutation(async (params: Params) => {
  const res = await apiClient.post('/users/activation/', params);
  console.log({ res });
  return res.data;
});

export default useActivateUser;
