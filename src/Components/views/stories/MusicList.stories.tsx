import { MusicList } from "../MusicList";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "views/MusicList",
  component: MusicList,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof MusicList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    MusicList: [
      {
        auther: "auther",
        image: "https://picsum.photos/200",
        mapper: "mapper",
        music_dir: "music_dir",
        music_file: "music_file",
        music_name: "music_name",
        length_of_music_sec: 503,
        id: 1,
      },
      {
        auther: "ほげほげ",
        image: "https://picsum.photos/201",
        mapper: "mapper",
        music_dir: "music_dir",
        music_file: "music_file",
        music_name: "music_name",
        length_of_music_sec: 39_100,
        id: 2,
      },
      {
        auther: "heyhey",
        image: "https://picsum.photos/101",
        mapper: "mapper",
        music_dir: "music_dir",
        music_file: "music_file",
        music_name: "music_name",
        length_of_music_sec: 203,
        id: 3,
      },
      {
        auther: "auther",
        image: "https://picsum.photos/200",
        mapper: "mapper",
        music_dir: "music_dir",
        music_file: "music_file",
        music_name: "music_name",
        length_of_music_sec: 503,
        id: 4,
      },
      {
        auther: "ほげほげ",
        image: "https://picsum.photos/201",
        mapper: "mapper",
        music_dir: "music_dir",
        music_file: "music_file",
        music_name: "music_name",
        length_of_music_sec: 39_100,
        id: 5,
      },
      {
        auther: "heyhey",
        image: "https://picsum.photos/101",
        mapper: "mapper",
        music_dir: "music_dir",
        music_file: "music_file",
        music_name: "music_name",
        length_of_music_sec: 203,
        id: 6,
      },
    ],
  },
};

export const One: Story = {
  args: {
    MusicList: [
      {
        auther: "auther",
        image: "https://picsum.photos/200",
        mapper: "mapper",
        music_dir: "music_dir",
        music_file: "music_file",
        music_name: "music_name",
        length_of_music_sec: 503,
        id: 1,
      },
    ],
  },
};
