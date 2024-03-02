import { SongData } from "../../../src-tauri/bindings/SongData";
import { F7PlayFill } from "../icons/F7PlayFill";
import { Fa6RegularImage } from "../icons/Fa6RegularImage";
import { ActionIcon, Avatar, Box, Flex, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";

function formatSeconds(seconds: number) {
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return `${minutes.toString().padStart(1, "0")}:${seconds.toString().padStart(2, "0")}`;
}
type MusicItemProps = {
  MusicItem: SongData;
  id: number;
};
export const MusicItem = (props: MusicItemProps) => {
  const { hovered, ref } = useHover();

  return (
    <Flex
      ref={ref}
      p={12}
      gap={20}
      justify="flex-start"
      align="center"
      direction="row"
      wrap="wrap"
      flex={"1"}
    >
      <Flex w={"24px"} justify={"center"}>
        {hovered ? (
          <ActionIcon variant="subtle" color="gray">
            <F7PlayFill height={32} width={32} />
          </ActionIcon>
        ) : (
          <Text style={{ color: "white" }}>{props.id + 1}</Text>
        )}
      </Flex>
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
      <Flex justify={"end"} flex={1} gap={50}>
        <Box>
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
        </Box>
        <Flex justify={"end"} w={100}>
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
      </Flex>
    </Flex>
  );
};
