import { SongDataType } from "../types";
import { invoke } from "@tauri-apps/api";
import { join } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { atom } from "jotai";
import { atomWithSuspenseQuery } from "jotai-tanstack-query";

export const MusicFileListAtom = atom<SongDataType[]>([]);

export const MusicFileListAtomAsync = atomWithSuspenseQuery((get) => ({
  queryKey: ["users", get(MusicFileListAtom)],
  queryFn: async ({ queryKey: [] }) => {
    const songDataList: SongDataType[] = await invoke("get_bs_music_files");

    return songDataList.map((songData) => {
      return {
        ...songData,
        image: convertFileSrc(songData.image),
        music_file: convertFileSrc(songData.music_file),

        length_of_music: songData.length_of_music,
      };
    });
  },
}));
