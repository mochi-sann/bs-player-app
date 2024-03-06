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
    seek: {
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
    slider: {
      max: 405,
      playingSec: 29,
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
