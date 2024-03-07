import { MusicItem } from "../MusicItem";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "views/MusicItem",
  component: MusicItem,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof MusicItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    MusicItem: {
      auther: "auther",
      image: "https://picsum.photos/200",
      mapper: "mapper",
      music_dir: "music_dir",
      music_file: "music_file",
      music_name: "music_name",
      id: 3,
      length_of_music_sec: 204,
      length_of_music_millisec: 204000,
    },
    id: 2,
    onclick(id) {
      console.log(id);
    },
  },
};

export const NoIcon: Story = {
  args: {
    MusicItem: {
      auther: "auther",
      image: "",
      mapper: "mapper",
      music_dir: "music_dir",
      music_file: "music_file",
      music_name: "music_name",
      id: 3,
      length_of_music_sec: 204,
      length_of_music_millisec: 204000,
    },
    id: 101,
  },
};
