import { atom } from "jotai";
import { SongDataType } from "../types";

export type PlayerStateAtomType = {
  isPlaying: boolean;
  selectedSong: SongDataType | null;
};

export const PlayerStateAtom = atom<PlayerStateAtomType>({
  isPlaying: false,

  selectedSong: null,
});
