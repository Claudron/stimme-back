import React, { useState, useEffect } from "react";
import useExercise from "../hooks/useExercise";
import { Files } from "../hooks/useExercise";
import { Select, Box, Flex } from "@chakra-ui/react";


const ExerciseSelector = () => {
  const { data: exercises } = useExercise();

  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [methods, setMethods] = useState<any[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [ranges, setRanges] = useState<string[]>([]);
  const [selectedRange, setSelectedRange] = useState<string | null>(null); // State to keep track of selected range
  const [directions, setDirections] = useState<string[]>([]); // State to keep track of available directions based on the selected range
  const [selectedDirection, setSelectedDirection] = useState<string | null>(
    null
  );
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
      const uniqueRanges = [
        ...new Set(method?.files.map((file: Files) => file.range)),
      ] as string[];
      setRanges(uniqueRanges);
    } else {
      setRanges([]);
    }
  }, [selectedMethod, methods]);

  useEffect(() => {
    if (selectedRange) {
      const method = methods.find((m) => m.name === selectedMethod);
      const uniqueDirections = [
        ...new Set(
          method?.files
            .filter((file: Files) => file.range === selectedRange)
            .map((file: Files) => file.direction)
        ),
      ] as string[];
      setDirections(uniqueDirections);
    } else {
      setDirections([]);
    }
  }, [selectedRange, methods]);

  useEffect(() => {
    if (selectedRange && selectedDirection) {
      const method = methods.find((m) => m.name === selectedMethod);
      const uniqueTempos = [
        ...new Set(
          method?.files
            .filter(
              (file: Files) =>
                file.range === selectedRange &&
                file.direction === selectedDirection
            )
            .map((file: Files) => file.tempo)
        ),
      ] as string[];
      setTempos(uniqueTempos);
    } else {
      setTempos([]);
    }
  }, [selectedRange, selectedDirection, methods]);

  return (
    <Flex align="center" padding="5" boxShadow="xl" rounded="md" wrap="wrap">
      {/* Exercise Selector */}
      <Box mr="4">
        <Select 
          placeholder="Select Exercise"
          value={selectedExercise || ''} 
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedExercise(e.target.value)}>
          {exercises?.map((exercise) => (
            <option key={exercise.id} value={exercise.name}>
              {exercise.name}
            </option>
          ))}
        </Select>
      </Box>

      {/* Method Selector */}
      {selectedExercise && (
        <Box mr="4">
          <Select 
            placeholder="Select Method"
            value={selectedMethod || ''} 
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedMethod(e.target.value)}>
            {methods.map((method) => (
              <option key={method.id} value={method.name}>
                {method.name}
              </option>
            ))}
          </Select>
        </Box>
      )}

      {/* Range Selector */}
      {selectedMethod && (
        <Box mr="4">
          <Select 
            placeholder="Select Range"
            value={selectedRange || ''} 
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedRange(e.target.value)}>
            {ranges.map((range, index) => (
              <option key={index} value={range}>
                {range}
              </option>
            ))}
          </Select>
        </Box>
      )}

      {/* Direction Selector */}
      {selectedRange && (
        <Box mr="4">
          <Select 
            placeholder="Select Direction"
            value={selectedDirection || ''} 
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedDirection(e.target.value)}>
            {directions.map((direction, index) => (
              <option key={index} value={direction}>
                {direction}
              </option>
            ))}
          </Select>
        </Box>
      )}

      {/* Tempo Selector */}
      {selectedDirection && (
        <Box mr="4">
          <Select 
            placeholder="Select Tempo"
            value={selectedTempo || ''} 
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedTempo(e.target.value)}>
            {tempos.map((tempo, index) => (
              <option key={index} value={tempo}>
                {tempo}
              </option>
            ))}
          </Select>
        </Box>
      )}
    </Flex>
  );
};

export default ExerciseSelector;
