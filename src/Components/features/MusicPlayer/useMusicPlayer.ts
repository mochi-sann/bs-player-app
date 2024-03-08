import { useEffect, useRef, useState } from "react";
import { PlayerStateAtom } from "@/lib/jotai/Player.Jotai";
import { MusicFileListAtomAsync } from "@/lib/jotai/jotai";
import { useAtom } from "jotai";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";

export const useMusicPlayer = ({ MusicFileUrl }: { MusicFileUrl: string }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [PlayerState, setPlayerState] = useAtom(PlayerStateAtom);
  const [musicList] = useAtom(MusicFileListAtomAsync);
  const [Seeking, setSeeking] = useState(false);
  // webaudio api を使って再生する

  useEffect(() => {
    const audio = audioRef.current;
    console.log({ PlayerState, MusicFileUrl });
    console.log({ audio });
    if (audio) {
      audio.src = MusicFileUrl;
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });
      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });
    }
  }, [MusicFileUrl]);

  const playAndPause = () => {
    // setPlayerState((prev) => {
    //   return { ...prev, isPlaying: !prev.isPlaying };
    // });
    const audio = audioRef.current;
    if (audio) {
      if (PlayerState.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setPlayerState((prev) => {
        return { ...prev, isPlaying: !prev.isPlaying };
      });
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
  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = parseFloat(e.target.value);
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
