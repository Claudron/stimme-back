import React from "react";
import useExerciseMethod from "../hooks/useExerciseMethod";
import useExercise from "../hooks/useExercise";

const ExerciseList = () => {
  const { data: exercises, isLoading, isError } = useExercise();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data.</p>;

  return (
    <div>
      {exercises?.map((exercise) => (
        <div key={exercise.id}>
          <h2>{exercise.name}</h2>
          
          {/* Display other exercise details here */}
        </div>
      ))}
    </div>
  );
};

export default ExerciseList;
