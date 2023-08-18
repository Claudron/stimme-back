import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

interface Exercises {
    id: number;
    name: string;
    range: string;
    direction: string;
    tempo: string;
    file: string;

}

const useExercises = () => useQuery<Exercises[], Error>({
  queryKey: ['Exercises'],
  queryFn: () => 
    apiClient
      .get<Exercises[]>('/practice/exercises/')
      .then(res => {
        console.log(res.data); 
        return res.data;
      }),     
});

export default useExercises;
