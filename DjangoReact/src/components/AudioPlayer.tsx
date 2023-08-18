import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  VStack,
  HStack,
  ListItem,
  List,
} from "@chakra-ui/react";
import useAudioList from "../hooks/useAudioList";
import useAudioDetail from "../hooks/useAudioDetail"; 

// type Audio = {
//   id: number;
//   title: string;
//   audio_file: string;
// };

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTrackId, setCurrentTrackId] = useState<number | undefined>();
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { data: audioListData } = useAudioList();
  const { data: audioDetail } = useAudioDetail(currentTrackId?.toString());
  
  useEffect(() => {
    if (audioListData && audioListData.length > 0 && !currentTrackId) {
      setCurrentTrackId(audioListData[0].id);
    }
  }, [audioListData]);

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
    <VStack spacing={4} alignItems="center">
      <Text fontSize="xl">{audioDetail?.title || "Loading..."}</Text>

      <audio
        ref={audioRef}
        src={audioDetail?.audio_file}
        onTimeUpdate={() => setCurrentTime(audioRef.current!.currentTime)}
        onLoadedMetadata={() => setDuration(audioRef.current!.duration)}
        onEnded={playpauseTrack}
      />

      <HStack spacing={4}>
        {/* Note: Prev/Next functionality can be added if needed */}
        <Button onClick={playpauseTrack}>{isPlaying ? "Pause" : "Play"}</Button>
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
          onChange={(val) =>
            seekTo({ target: { value: val.toString() } } as any)
          }
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

      <VStack spacing={2} align="start" w="100%">
        <List alignItems="center">
          {audioListData?.map((audioFile) => (
            <ListItem key={audioFile.id}>
              <Button
                whiteSpace={"normal"}
                textAlign="left"
                fontSize="lg"
                variant="link"
                onClick={() => setCurrentTrackId(audioFile.id)}
              >
                {audioFile.title}
              </Button>
            </ListItem>
          ))}
        </List>
      </VStack>
    </VStack>
  );
};

export default AudioPlayer;
