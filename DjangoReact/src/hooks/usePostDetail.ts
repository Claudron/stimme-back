import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { Post } from "../entities/post";

const usePostDetail = (id: string) => useQuery<Post, Error>({
  queryKey:['posts', id],
  queryFn: () => 
    apiClient
      .get<Post>(`/api/content/${id}`)
      .then(res => res.data),
      
});

export default usePostDetail;

