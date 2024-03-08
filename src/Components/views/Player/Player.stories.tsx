import { Player } from "./Player";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "views/Player",
  component: Player,
  argTypes: {
    PlayAndPause: {
      action: "play or pause",
    },
    SkipBack: {
      action: "SkipBack",
    },
    SkipForward: {
      action: "SkipForward",
    },
    handleSeek: {
      action: (value: any) => {
        action("seek")(value);
      },
    }, // Add the missing property 'slider.seek' here
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Player>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    playing: true,
    max: 405,
    playingSec: 29,
    SongData: {
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
    voleme: 0.5,
  },
  parameters: {
    docs: {
      description: {
        component: `コンポーネントの説明マークダウン。`,
      },
    },
  },
};

export const Zero: Story = {
  args: {
    playing: true,
    max: 405,
    playingSec: 0,
    SongData: {
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
  },
  parameters: {
    docs: {
      description: {
        component: `コンポーネントの説明マークダウン。`,
      },
    },
  },
};

export const Max: Story = {
  args: {
    playing: true,
    max: 100,
    playingSec: 100,
    SongData: {
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
  },
  parameters: {
    docs: {
      description: {
        component: `コンポーネントの説明マークダウン。`,
      },
    },
  },
};

export const NoneImage: Story = {
  args: {
    playing: true,
    max: 100,
    playingSec: 100,
    SongData: {
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
  },
  parameters: {
    docs: {
      description: {
        component: `コンポーネントの説明マークダウン。`,
      },
    },
  },
};
export const SongDataNull: Story = {
  args: {
    playing: true,
    max: 100,
    playingSec: 100,
    SongData: null,
  },
  parameters: {
    docs: {
      description: {
        component: `コンポーネントの説明マークダウン。`,
      },
    },
  },
};
