import { Box } from "@mantine/core";
import { SongData } from "../../../src-tauri/bindings/SongData";

type MusicListProps = {
  MusicList: SongData[];
};
export const MusicList = (props: MusicListProps) => {
  return (
    <div>
      {props.MusicList.map((music) => (
        <Box></Box>
      ))}
      <pre>{JSON.stringify(props.MusicList, null, 2)}</pre>
    </div>
  );
};
