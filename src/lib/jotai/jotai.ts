import { atom } from "jotai";
import { SongDataType } from "../types";
import { atomWithObservable } from "jotai/utils";
import { invoke } from "@tauri-apps/api";
import { atomWithSuspenseQuery } from "jotai-tanstack-query";

export const MusicFileListAtom = atom<SongDataType[]>([]);

export const MusicFileListAtomAsync = atomWithSuspenseQuery((get) => ({
  queryKey: ["users", get(MusicFileListAtom)],
  queryFn: async ({ queryKey: [] }) => {
    const songDataList: SongDataType[] = await invoke("get_bs_music_files");
    return songDataList;
  },
}));
