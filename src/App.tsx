import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Button } from "@mantine/core";
import { useAtom } from "jotai";
import { MusicFileListAtom } from "./lib/jotai/jotai";
import { MusicPlayer } from "./Components/MusicPlayer";

function App() {
  const [fileList, setFileList] = useState<String[]>([]);
  const [musickFileList, setMusickFileList] = useAtom(MusicFileListAtom);

  async function getFileLists(
    path: string = "C:\\Users\\mochi\\Downloads\\105f5 (Shelter - ETAN)",
  ) {
    const fileListTemp: string[] = await invoke("get_bs_music_files");
    const musicFiles: string[] = await invoke("get_music_file", {
      fileList: fileListTemp,
      baseDirPath: path,
    });
    console.log({ musicFiles });
    console.log(fileListTemp);
    setMusickFileList((pre) => [...pre, ...musicFiles]);
    console.log({ musickFileList });

    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setFileList(fileListTemp);
  }

  return (
    <div className="container">
      <pre>{JSON.stringify({ fileList, musickFileList }, null, 2)}</pre>

      <p>Hello woarld</p>
      {musickFileList.length > 0 && <MusicPlayer />}

      <Button
        onClick={() => {
          getFileLists();
        }}
        type="submit"
      >
        fileList
      </Button>
    </div>
  );
}

export default App;
