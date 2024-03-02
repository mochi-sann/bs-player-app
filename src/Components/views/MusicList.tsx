import React from "react";
import { SongData } from "../../../src-tauri/bindings/SongData";
import { MusicItem } from "./MusicItem";
import { Box, Button, Divider, Flex, Stack } from "@mantine/core";

type MusicListProps = {
  MusicList: SongData[];
};
export const MusicList = (props: MusicListProps) => {
  return (
    <Flex direction={"column"}>
      {props.MusicList.map((music, key) => (
        <React.Fragment key={key}>
          <MusicItem MusicItem={music} id={key} />
          {key < props.MusicList.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Flex>
  );
};
