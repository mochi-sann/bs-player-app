import { SongDataType } from "../types";
import { atom } from "jotai";

export type PlayerStateAtomType = {
  isPlaying: boolean;
  selectedSong: SongDataType | null;
};

export const PlayerStateAtom = atom<PlayerStateAtomType>({
  isPlaying: false,

  selectedSong: null,
});
