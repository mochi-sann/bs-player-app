import { useState } from "react";
import { SongData } from "../../src-tauri/bindings/SongData";
import { MusicFileListAtom } from "../lib/jotai/jotai";
import { selectListOptionType } from "../lib/types";
import { useQuery } from "@tanstack/react-query";
import { join } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { useAtom } from "jotai";
import ReactPlayer from "react-player";
import Select from "react-select";

export const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [audioList] = useAtom(MusicFileListAtom);

  const [AudioUrl, setAudioUrl] = useState<SongData>();

  const selectListOptions: Array<selectListOptionType> = audioList.map(
    (audio) => {
      // console.log({ value: audio.musicFile, label: audio.musicName });

      return { value: audio, label: audio.music_name };
    },
  );

  const { isPending: isImagePending, data: imageUrl } = useQuery({
    queryKey: ["image", AudioUrl?.image],
    queryFn: async () => {
      const new_url = convertFileSrc(await join(AudioUrl?.image || ""));
      return new_url;
    },
  });
  const { isPending: isAudioPending, data: AudioFileUrl } = useQuery({
    queryKey: ["audio", AudioUrl?.music_file],
    queryFn: async () => {
      const new_url = convertFileSrc(await join(AudioUrl?.music_file || ""));
      return new_url;
    },
  });

  const toggle = () => setPlaying(!playing);

  return (
    <div>
      <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
      {AudioUrl?.music_file}
      {isImagePending ? "Loading..." : <img src={imageUrl} alt="image" />}
      {isAudioPending ? (
        "Loading..."
      ) : (
        <ReactPlayer url={AudioFileUrl} playing={playing} controls={true} />
      )}
      <Select
        onChange={(e) => setAudioUrl(e?.value)}
        options={selectListOptions}
      />
    </div>
  );
};
