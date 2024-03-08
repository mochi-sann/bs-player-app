import { useEffect, useRef, useState } from "react";
import { PlayerStateAtom } from "@/lib/jotai/Player.Jotai";
import { MusicFileListAtomAsync } from "@/lib/jotai/jotai";
import { use } from "i18next";
import { useAtom } from "jotai";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";

export const useMusicPlayer = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [PlayerState, setPlayerState] = useAtom(PlayerStateAtom);
  const [musicList] = useAtom(MusicFileListAtomAsync);
  const [Seeking, setSeeking] = useState(false);

  // webaudio api を使って再生する

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.src = PlayerState.selectedSong?.music_file || "";
      console.log("audio!!!!!!!!!!!!!", { audio, PlayerState });

      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });
      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
        setPlayerState((prev) => {
          return { ...prev, playingSec: audio.currentTime };
        });
      });
      if (PlayerState.isPlaying) {
        audio.play();
      }
    }
  }, [PlayerState.selectedSong?.id]);

  const playAndPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (PlayerState.isPlaying) {
        audio.pause();
        setPlayerState((prev) => {
          return { ...prev, isPlaying: false };
        });
      } else {
        audio.play();
        setPlayerState((prev) => {
          return { ...prev, isPlaying: true };
        });
      }
    }
  };

  const SkipForward = () => {
    setPlayerState((prev) => {
      return {
        ...prev,
        selectedSong: musicList.data[(PlayerState.selectedSong?.id || 0) + 1],
      };
    });
  };
  const SkipBack = () => {
    setPlayerState((prev) => {
      return {
        ...prev,
        selectedSong: musicList.data[(PlayerState.selectedSong?.id || 0) + 1],
      };
    });
  };
  const seek = (value: number) => {
    console.log("seek", value);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value;
      setPlayerState((prev) => {
        return { ...prev, playingSec: value };
      });
    }
  };

  // };
  // const handleMouseDown = () => {
  //   setSeeking(true);
  //   console.log("mouse down");
  // };
  // const handleMouseUp = () => {
  //   console.log("mouse up");

  //   AudioRef.seekTo(PlayerState.playingSec);

  //   setSeeking(false);
  // };

  const onProgress = (progress: OnProgressProps) => {
    if (Seeking) {
      return;
    }
    setPlayerState((prev) => {
      return { ...prev, playingSec: progress.playedSeconds };
    });
  };

  return {
    seek,
    playAndPause,
    PlayerState,
    setPlayerState,
    SkipBack,
    SkipForward,
    onProgress,
    audioRef,
  };
};
