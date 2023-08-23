import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  HStack,
} from "@chakra-ui/react";
import { File } from "../store/useExerciseStore";

type AudioPlayerProps = {
  playlist: File[];
};

const AudioPlayer = ({ playlist }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [trackIndex, setTrackIndex] = useState<number>(0); // Keep track of the current track index
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
        console.log('Audio Source:', playlist[trackIndex]?.file);
        audioRef.current.currentTime = 0;
        setCurrentTime(0);
    }
}, [trackIndex, playlist]);

  const playpauseTrack = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNextTrack = () => {
    if (trackIndex < playlist.length - 1) {
      setTrackIndex(trackIndex + 1);
    }
  };

  const playPreviousTrack = () => {
    if (trackIndex > 0) {
      setTrackIndex(trackIndex - 1);
    }
  };

  const seekTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekPosition = duration * (Number(e.target.value) / 100);
    if (audioRef.current) {
      audioRef.current.currentTime = seekPosition;
    }
  };

  const setVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = Number(e.target.value) / 100;
    }
  };

  return (
    <HStack spacing={4} alignItems="center">
      <audio
        ref={audioRef}
        src={playlist[trackIndex]?.file}
        onTimeUpdate={() => setCurrentTime(audioRef.current!.currentTime)}
        onLoadedMetadata={() => setDuration(audioRef.current!.duration)}
        onEnded={playpauseTrack}
      />

      <HStack spacing={4}>
        <Button onClick={playPreviousTrack}>Previous</Button>
        <Button onClick={playpauseTrack}>
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button onClick={playNextTrack}>Next</Button>
      </HStack>

      <Box width="300px">
        <Text>
          {Math.floor(currentTime / 60)}:
          {Math.floor(currentTime % 60)
            .toString()
            .padStart(2, "0")}
        </Text>
        <Slider
          value={duration ? (currentTime / duration) * 100 : 0}
          onChange={(val: number) => seekTo({ target: { value: val.toString() }} as React.ChangeEvent<HTMLInputElement>)}

        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Text>
          {Math.floor(duration / 60)}:
          {Math.floor(duration % 60)
            .toString()
            .padStart(2, "0")}
        </Text>
      </Box>

      <Box width="300px">
        <Slider
          defaultValue={100}
          onChange={(val) =>
            setVolume({ target: { value: val.toString() } } as any)
          }
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
    </HStack>
  );
};

export default AudioPlayer;
