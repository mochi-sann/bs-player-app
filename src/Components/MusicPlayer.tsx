import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { MusicFileListAtom } from "../lib/jotai/jotai";
import ReactPlayer from "react-player";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { homeDir, join } from "@tauri-apps/api/path";

export const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [audio] = useState(
    new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"),
  );
  const [audioList] = useAtom(MusicFileListAtom);
  const [AudioUrl, setAudioUrl] = useState("");
  const [player, setPlayer] = useState<JSX.Element>();
  const audioUrl = audioList[0];
  useEffect(() => {
    const fn = async () => {
      const baseDir = await homeDir();
      const new_url = convertFileSrc(await join(audioUrl));
      setAudioUrl(new_url);
      const player = <ReactPlayer url={new_url} controls={true} />;
      setPlayer(player);
    };
    fn();
  }, [audioUrl]);

  const toggle = () => setPlaying(!playing);

  return (
    <div>
      <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
      <pre>{JSON.stringify({ audioList, audioUrl, AudioUrl }, null, 2)}</pre>
      player : {player}
    </div>
  );
};
