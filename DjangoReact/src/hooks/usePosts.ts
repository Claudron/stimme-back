import useData from "./useData";

export interface Post {
    id: number;
    title: string;
  }

const usePosts = () => useData<Post>('/content')

export default usePosts;