import { useRef, useState } from "react";
import { PlayerStateAtom } from "@/lib/jotai/Player.Jotai";
import { MusicFileListAtomAsync } from "@/lib/jotai/jotai";
import { useAtom } from "jotai";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";

export const useMusicPlayer = () => {
  const [PlayerState, setPlayerState] = useAtom(PlayerStateAtom);
  const [musicList] = useAtom(MusicFileListAtomAsync);
  const [Seeking, setSeeking] = useState(false);
  const ReactPlayerRef = useRef<ReactPlayer | null>(null);

  const playAndPause = () => {
    setPlayerState((prev) => {
      return { ...prev, isPlaying: !prev.isPlaying };
    });
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
  const seek = (passdSec: number): number => {
    // setSeeking(true);
    console.log("seeking");
    setPlayerState((prev) => {
      return { ...prev, playingSec: passdSec };
    });
    // setSeeking(false);
    return passdSec;
  };
  const handleMouseDown = () => {
    setSeeking(true);
    console.log("mouse down");
  };
  const handleMouseUp = () => {
    console.log("mouse up");

    ReactPlayerRef.seekTo(PlayerState.playingSec);

    setSeeking(false);
  };

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
    ReactPlayerRef,
    handleMouseDown,
    handleMouseUp,
  };
};
