import { atom } from "jotai";
import { SongDataType } from "../types";

export const MusicFileListAtom = atom<SongDataType[]>([]);
