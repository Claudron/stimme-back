
import React from 'react';
import useExercises from '../hooks/useExercises';

const ExerciseList = () => {
  const { data: exercises, isLoading, isError } = useExercises();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data.</p>;

  return (
    <div>
      {exercises?.map(exercise => (
        <div key={exercise.id}>
          <h2>{exercise.name}</h2>
          <h2>{exercise.file}</h2>
          {/* Display other exercise details here */}
        </div>
      ))}
    </div>
  );
}

export default ExerciseList;
