import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
// import instance from "../services/api-client";
import { Post as Content } from "../entities/post";

interface Post {
  post: Content;
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

