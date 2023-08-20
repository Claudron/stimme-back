import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

interface Exercise {
    id: number;
    name: string;
    methods: string;
}

const useExerciseMethod = () => useQuery<Exercise[], Error>({
  queryKey: ['Exercise List'],
  queryFn: () => 
    apiClient
      .get<Exercise[]>('/practice/exercises/')
      .then(res => {
        console.log(res.data); 
        return res.data;
      }),     
});

export default useExerciseMethod;
