import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";


export interface Post {
    id: number;
    title: string;
  }

const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get("/content", {signal: controller.signal})
      .then((res) => setPosts(res.data))
      .catch((err) => {
        // return because of double render in strict mode
        if (err instanceof CanceledError) return;
        setError(err.message)});

    return () => controller.abort();  
  }, []);

  return { posts, error };

}

export default usePosts;