import { useQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/tauri";
import { useAtom } from "jotai";
import { MusicFileListAtom } from "../lib/jotai/jotai";
import { SongDataType } from "../lib/types";

export function useAppInit() {
  const [musickFileList, setMusickFileList] = useAtom(MusicFileListAtom);
  const { isPending: isImagePending, data: songDataList } = useQuery({
    queryKey: ["audiolist"],
    queryFn: async () => {
      const songDataList: SongDataType[] = await invoke("get_bs_music_files");
      setMusickFileList(songDataList);
      return songDataList;
    },
  });
  return { musickFileList, isImagePending };
}
