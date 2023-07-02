import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
// import instance from "../services/api-client";

export interface Post {
    id: number;
    title: string;
  }

  
const usePosts = () => useQuery<Post[], Error>({
  queryKey: ['posts'],
  queryFn: () => 
    apiClient
      .get<Post[]>('/api/content').then(res => {
        console.log({ res });
        return res.data
      })
});

export default usePosts;

