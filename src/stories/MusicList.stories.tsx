import type { Meta, StoryObj } from "@storybook/react";
import { MusicList } from "../Components/views/MusicList";

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
        image: "image",
        mapper: "mapper",
        music_dir: "music_dir",
        music_file: "music_file",
        music_name: "music_name",
      },
    ],
  },
};
