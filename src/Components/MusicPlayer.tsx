import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { MusicFileListAtom } from "../lib/jotai/jotai";
import ReactPlayer from "react-player";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { join } from "@tauri-apps/api/path";
import Select from "react-select";
import { selectListOptionType } from "../lib/types";

export const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [audioList] = useAtom(MusicFileListAtom);

  const [AudioUrl, setAudioUrl] = useState("");
  const audioUrl = audioList[0];
  const [player, setPlayer] = useState<JSX.Element>();

  const selectListOptions: Array<selectListOptionType> = audioList.map(
    (audio) => {
      // console.log({ value: audio.musicFile, label: audio.musicName });

      return { value: audio.music_file, label: audio.music_name };
    },
  );

  useEffect(() => {
    const fn = async () => {
      const new_url = convertFileSrc(await join(AudioUrl));
      const player = (
        <ReactPlayer url={new_url} playing={playing} controls={true} />
      );
      setPlayer(player);
      console.log({ audioUrl });
    };
    fn();
  }, [AudioUrl]);

  useEffect(() => {
    const fn = async () => {
      console.log({ audioUrl });
    };
    fn();
  }, [audioList]);

  const toggle = () => setPlaying(!playing);

  return (
    <div>
      <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
      {AudioUrl}
      <Select
        onChange={(e) => setAudioUrl(e?.value || "")}
        options={selectListOptions}
      />
      {player}
    </div>
  );
};
