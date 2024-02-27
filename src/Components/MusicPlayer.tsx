import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { MusicFileListAtom } from "../lib/jotai/jotai";
import ReactPlayer from "react-player";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { homeDir, join } from "@tauri-apps/api/path";
import { ComboboxData } from "@mantine/core";
import Select from "react-select";

export const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [audioList] = useAtom(MusicFileListAtom);
  const [AudioUrl, setAudioUrl] = useState("");
  const audioUrl = audioList[0];

  const selectListOptions: Array<{ value: string; label: string }> =
    audioList.map((audio) => {
      // console.log({ value: audio.musicFile, label: audio.musicName });

      return { value: audio.music_file, label: audio.music_name };
    });

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
      <Select options={selectListOptions} />
    </div>
  );
};
