import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { Post } from "../entities/post";

const usePosts = () => useQuery<Post[], Error>({
  queryKey: ['posts'],
  queryFn: () => 
    apiClient
      .get<Post[]>('/api/content')
      .then(res => {
        console.log(res.data); // log the response to the console
        return res.data;
      }),     
});

export default usePosts;


