import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";



export interface Post {
  id: number;
  title: string;
  body: string;
}

const usePostDetail = (id: string) => useQuery<Post, Error>({
  queryKey:['posts', id],
  queryFn: () => 
    apiClient
      .get<Post>(`/content/${id}`)
      .then(res => res.data),
});

export default usePostDetail;