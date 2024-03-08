import { useMusicPlayer } from "./useMusicPlayer";
import { MusicList } from "@/Components/views/MusicList";
import { Player } from "@/Components/views/Player";
import { useI18nContext } from "@/i18n/i18n-react";
import { MusicFileListAtomAsync } from "@/lib/jotai/jotai";
import { useAtom } from "jotai";

export const MusicPlayer = () => {
  const { LL } = useI18nContext();
  const [musickFileList] = useAtom(MusicFileListAtomAsync);
  const {
    playAndPause,
    PlayerState,
    setPlayerState,
    SkipBack,
    SkipForward,
    seek,
    audioRef,
  } = useMusicPlayer();

  const PlayMusic = (music: number) => {
    console.log({ music });
    setPlayerState((prev) => {
      return {
        ...prev,
        selectedSong: musickFileList.data[music],
        isPlaying: true,
      };
    });
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
      <audio ref={audioRef}>
        <track kind="captions" src={PlayerState.selectedSong?.music_file} />
      </audio>

      <Player
        PlayAndPause={playAndPause}
        SkipForward={SkipForward}
        SkipBack={SkipBack}
        max={PlayerState.selectedSong?.length_of_music_sec || 0}
        playingSec={PlayerState.playingSec}
        playing={PlayerState.isPlaying}
        SongData={PlayerState.selectedSong}
        handleSeek={seek}
      />
    </div>
  );
};
