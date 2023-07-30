import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { Post as Content } from "../entities/post";


export interface Post {
  post: Content;
}

const usePostDetail = (id: string) => useQuery<Post, Error>({
  queryKey:['posts', id],
  queryFn: () => 
    apiClient
      .get<Post>(`/api/content/${id}`)
      .then(res => res.data),
});

export default usePostDetail;

