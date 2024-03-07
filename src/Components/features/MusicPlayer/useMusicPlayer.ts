import { PlayerStateAtom } from "@/lib/jotai/Player.Jotai";
import { MusicFileListAtomAsync } from "@/lib/jotai/jotai";
import { useAtom } from "jotai";
import { OnProgressProps } from "react-player/base";

export const useMusicPlayer = () => {
  const [PlayerState, setPlayerState] = useAtom(PlayerStateAtom);
  const [musicList] = useAtom(MusicFileListAtomAsync);

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
    // setPlayerState((prev) => {
    //   return { ...prev, playingSec: passdSec };
    // });
    return passdSec;
  };

  const onProgress = (progress: OnProgressProps) => {
    console.log({ progress });
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
  };
};
