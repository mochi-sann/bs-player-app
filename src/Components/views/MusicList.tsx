import { SongData } from "../../../src-tauri/bindings/SongData";
import { Box, Button } from "@mantine/core";

type MusicListProps = {
  MusicList: SongData[];
};
export const MusicList = (props: MusicListProps) => {
  return (
    <div>
      {props.MusicList.map((music) => (
        <Box>
          <Button>{JSON.stringify(music, null, 2)}</Button>
        </Box>
      ))}
      <pre>{JSON.stringify(props.MusicList, null, 2)}</pre>
    </div>
  );
};
