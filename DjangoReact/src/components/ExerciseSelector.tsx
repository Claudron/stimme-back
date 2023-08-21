import React, { useState, useEffect } from 'react';
import useExercise from '../hooks/useExercise';
import { Files } from '../hooks/useExercise';

const ExerciseSelector = () => {
  const { data: exercises } = useExercise();

  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [methods, setMethods] = useState<any[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [ranges, setRanges] = useState<string[]>([]);
  const [selectedRange, setSelectedRange] = useState<string | null>(null); // State to keep track of selected range
  const [directions, setDirections] = useState<string[]>([]); // State to keep track of available directions based on the selected range
  const [selectedDirection, setSelectedDirection] = useState<string | null>(null);
  const [tempos, setTempos] = useState<string[]>([]); // State to keep track of available tempos based on the selected range and direction
  const [selectedTempo, setSelectedTempo] = useState<string | null>(null);



  useEffect(() => {
    if (selectedExercise) {
      const exercise = exercises?.find((ex) => ex.name === selectedExercise);
      if (exercise) {
        setMethods(exercise.methods);
      }
    } else {
      setMethods([]);
      setSelectedMethod(null);
    }
  }, [selectedExercise, exercises]);

  useEffect(() => {
    if (selectedMethod) {
      const method = methods.find((m) => m.name === selectedMethod);
      const uniqueRanges = [...new Set(method?.files.map((file: Files) => file.range))] as string[];
      setRanges(uniqueRanges);
    } else {
      setRanges([]);
    }
  }, [selectedMethod, methods]);

  useEffect(() => {
    if (selectedRange) {
      const method = methods.find((m) => m.name === selectedMethod);
      const uniqueDirections = [...new Set(method?.files.filter((file: Files)=> file.range === selectedRange).map((file: Files) => file.direction))] as string[];
      setDirections(uniqueDirections);
    } else {
      setDirections([]);
    }
  }, [selectedRange, methods]);

  useEffect(() => {
    if (selectedRange && selectedDirection) {
      const method = methods.find((m) => m.name === selectedMethod);
      const uniqueTempos = [...new Set(method?.files.filter((file: Files) => file.range === selectedRange && file.direction === selectedDirection).map((file: Files) => file.tempo))] as string[];
      setTempos(uniqueTempos);
    } else {
      setTempos([]);
    }
  }, [selectedRange, selectedDirection, methods]);

  return (
    <div>
      {/* Exercise Selector */}
      <select value={selectedExercise || ''} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedExercise(e.target.value)}>
        <option value="">Select Exercise</option>
        {exercises?.map((exercise) => (
          <option key={exercise.id} value={exercise.name}>
            {exercise.name}
          </option>
        ))}
      </select>

      {/* Method Selector  */}
      {selectedExercise && (
        <select value={selectedMethod || ''} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedMethod(e.target.value)}>
          <option value="">Select Method</option>
          {methods.map((method) => (
            <option key={method.id} value={method.name}>
              {method.name}
            </option>
          ))}
        </select>
      )}

      {/* Range Selector  */}
      {selectedMethod && (
        <select value={selectedRange || ''} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedRange(e.target.value)}>
          <option value="">Select Range</option>
          {ranges.map((range, index) => (
            <option key={index} value={range}>
              {range}
            </option>
          ))}
        </select>
      )}

      {/* Direction Selector */}
      {selectedRange && (
        <select value={selectedDirection || ''} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedDirection(e.target.value)}>
          <option value="">Select Direction</option>
          {directions.map((direction, index) => (
            <option key={index} value={direction}>
              {direction}
            </option>
          ))}
        </select>
      )}

      {/* Tempo Selector  */}
      {selectedDirection && (
        <select value={selectedTempo || ''} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedTempo(e.target.value)}>
          <option value="">Select Tempo</option>
          {tempos.map((tempo, index) => (
            <option key={index} value={tempo}>
              {tempo}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default ExerciseSelector;



