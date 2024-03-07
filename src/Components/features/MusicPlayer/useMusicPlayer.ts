import { PlayerStateAtom } from "@/lib/jotai/Player.Jotai";
import { MusicFileListAtomAsync } from "@/lib/jotai/jotai";
import { useAtom } from "jotai";

export const useMusicPlayer = () => {
  const [PlayerState, setPlayerState] = useAtom(PlayerStateAtom);
  const [musicList] = useAtom(MusicFileListAtomAsync);
  const playAndPause = () => {
    setPlayerState((prev) => {
      return { ...prev, isPlaying: !prev.isPlaying };
    });
  };

  return { playAndPause };
};
