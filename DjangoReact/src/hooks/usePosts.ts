import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { Post } from "../entities/post";
import usePostQueryStore from "../store/PostStore";

const usePosts = () => {
  const postQuery = usePostQueryStore(s => s.PostQuery);

  return useQuery<Post[], Error>({
    queryKey: ['posts', postQuery],
    queryFn: () => {
      const params = {
        categories: postQuery.categoryId,
        ordering: postQuery.sortOrder,
        search: postQuery.searchText,
      };

      return apiClient
        .get<Post[]>('/api/content', { params })
        .then(res => {
          console.log(res.data);
          return res.data;
        });
    },     
  });
};

export default usePosts;



