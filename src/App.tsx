import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Button, Title } from "@mantine/core";
import { useAtom } from "jotai";
import { MusicFileListAtom } from "./lib/jotai/jotai";
import { MusicPlayer } from "./Components/MusicPlayer";
import { SongDataType } from "./lib/types";
import { useAppInit } from "./hooks/appInitHook";
import { useQuery } from "@tanstack/react-query";
import { atomWithSuspenseQuery } from "jotai-tanstack-query";

function App() {
  const [musickFileList, setMusickFileList] = useAtom(MusicFileListAtom);

  async function getFileLists() {
    const fileListTemp: SongDataType[] = await invoke("get_bs_music_files");

    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setMusickFileList(fileListTemp);
  }

  return (
    <div className="container">
      {/* <pre>{JSON.stringify({  musickFileList }, null, 2)}</pre> */}
      <div>
        <Title order={1}>Beat Saber Custom map player</Title>

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
    </div>
  );
}

export default App;
