import { SongDataType } from "../types";
import { atom } from "jotai";

export type PlayerStateAtomType = {
  isPlaying: boolean;
  selectedSong: SongDataType | null;
  seek: number;
  musicDurication: number;
  playingSec: number;
};

export const PlayerStateAtom = atom<PlayerStateAtomType>({
  isPlaying: false,
  seek: 0,
  selectedSong: null,
  musicDurication: 0,
  playingSec: 0,
});
