import { SongData } from "../../../src-tauri/bindings/SongData";
import { F7PlayFill } from "../icons/F7PlayFill";
import { Fa6RegularImage } from "../icons/Fa6RegularImage";
import { ActionIcon, Avatar, Flex, Text } from "@mantine/core";

function formatSeconds(seconds: number) {
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return `${minutes.toString().padStart(1, "0")}:${seconds.toString().padStart(2, "0")}`;
}
type MusicItemProps = {
  MusicItem: SongData;
};
export const MusicItem = (props: MusicItemProps) => {
  return (
    <Flex
      p={12}
      gap={20}
      justify="flex-start"
      align="center"
      direction="row"
      wrap="wrap"
      flex={"1"}
    >
      <ActionIcon variant="subtle" color="gray">
        <F7PlayFill height={32} width={32} />
      </ActionIcon>
      <Avatar
        src={props.MusicItem.image}
        variant="filled"
        radius="sm"
        size="md"
        color="rgba(255, 255, 255, 0)"
      >
        <Fa6RegularImage height={32} width={32} />
      </Avatar>
      <Flex direction="column" justify="center" align="flex-start" gap={-4}>
        <Text size="md" fw={700} style={{ lineHeight: 1.1 }}>
          {props.MusicItem.music_name}
        </Text>
        <Text size="sm" style={{ lineHeight: 1.1 }}>
          {props.MusicItem.auther}
        </Text>
      </Flex>
      <Text
        style={{
          color: "white",
          fontSize: 12,
          fontFamily: "Inter",
          fontWeight: "300",
          wordWrap: "break-word",
        }}
      >
        {props.MusicItem.mapper}
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 12,
          fontFamily: "Inter",
          fontWeight: "300",
          wordWrap: "break-word",
        }}
      >
        {formatSeconds(props.MusicItem.length_of_music)}
      </Text>
    </Flex>
  );
};
