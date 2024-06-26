import { haveMapPath } from "../MapPathHandler";
import { SongDataType } from "../types";
import { invoke } from "@tauri-apps/api";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { atom } from "jotai";
import { atomWithSuspenseQuery } from "jotai-tanstack-query";
import { atomWithStorage } from "jotai/utils";

export const MusicFileListAtom = atom<SongDataType[]>([]);

export const MusicFileListAtomAsync = atomWithSuspenseQuery((get) => ({
  queryKey: ["users", get(MusicFileListAtom)],
  // eslint-disable-next-line no-empty-pattern
  queryFn: async ({ queryKey: [] }) => {
    const songDataList: SongDataType[] = await invoke("get_bs_music_files");

    return songDataList.map((songData) => {
      return {
        ...songData,
        image: convertFileSrc(songData.image),
        music_file: convertFileSrc(songData.music_file),
      };
    });
  },
}));
export const MapPathAtomAsync = atomWithSuspenseQuery(() => ({
  queryKey: ["MapPathAtomAsync"],
  // eslint-disable-next-line no-empty-pattern
  queryFn: async ({ queryKey: [] }) => {
    return await haveMapPath();
  },
}));

export const VolmeAtom = atomWithStorage("AudioVolme", 0);
