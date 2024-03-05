import { MusicFileListAtomAsync } from "../lib/jotai/jotai";
import { MusicList } from "./views/MusicList";
import { useAtom } from "jotai";

export const MusicPlayer = () => {
  const [musickFileList] = useAtom(MusicFileListAtomAsync);
  const PlayMusic = (music: number) => {
    console.log(music, "music");
  };

  return (
    <div>
      {musickFileList.isLoading ? (
        <p>Loading...</p>
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
