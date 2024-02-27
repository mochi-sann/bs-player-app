import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Button } from "@mantine/core";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [fileList, setFileList] = useState<String[]>([]);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  async function getFileLists(
    path: string = "C:\\Users\\mochi\\Downloads\\105f5 (Shelter - ETAN)",
  ) {
    const fileListTemp: string[] = await invoke("get_file_list", {
      getDirPath: path,
    });
    const musicFiles = await invoke("get_music_file", {
      fileList: fileListTemp,
      baseDirPath: path,
    });
    console.log({ musicFiles });
    console.log(fileListTemp);
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setFileList(fileListTemp);
  }

  return (
    <div className="container">
      <pre>{JSON.stringify(fileList, null, 2)}</pre>

      <p>Hello woarld</p>

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
