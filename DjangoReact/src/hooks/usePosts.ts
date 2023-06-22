import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

export interface Post {
    id: number;
    title: string;
  }

  
const usePosts = () => useQuery<Post[], Error>({
  queryKey: ['posts'],
  queryFn: () => 
    apiClient
      .get<Post[]>('/content').then(res => res.data)
});

export default usePosts;