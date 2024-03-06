import { SongDataType } from "../types";
import { atom } from "jotai";

export type PlayerStateAtomType = {
  isPlaying: boolean;
  selectedSong: SongDataType | null;
  seek: number;
  musicLienht: number;
};

export const PlayerStateAtom = atom<PlayerStateAtomType>({
  isPlaying: false,
  seek: 0,
  selectedSong: null,
  musicLienht: 0,
});
