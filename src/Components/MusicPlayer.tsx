import { MusicFileListAtomAsync } from "../lib/jotai/jotai";
import { MusicList } from "./views/MusicList";
import { useI18nContext } from "@/i18n/i18n-react";
import { useAtom } from "jotai";

export const MusicPlayer = () => {
  const { LL } = useI18nContext();
  const [musickFileList] = useAtom(MusicFileListAtomAsync);
  const PlayMusic = (music: number) => {
    console.log(music, "music");
  };

  return (
    <div>
      {musickFileList.isLoading ? (
        <p>{LL.loading()}</p>
      ) : musickFileList.isError ? (
        <p>Error: </p>
      ) : (
        <div>
          <MusicList MusicList={musickFileList.data} onClick={PlayMusic} />
        </div>
      )}
    </div>
  );
};
