import { useMusicPlayer } from "./useMusicPlayer";
import { MusicList } from "@/Components/views/MusicList";
import { Player } from "@/Components/views/Player";
import { useI18nContext } from "@/i18n/i18n-react";
import { MusicFileListAtomAsync } from "@/lib/jotai/jotai";
import { useAtom } from "jotai";
import ReactPlaer from "react-player";

export const MusicPlayer = () => {
  const { LL } = useI18nContext();
  const [musickFileList] = useAtom(MusicFileListAtomAsync);
  const PlayMusic = (music: number) => {
    console.log(music, "music");
  };
  const { playAndPause } = useMusicPlayer();

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
      <ReactPlaer />

      <Player PlayAndPause={playAndPause} />
    </div>
  );
};
