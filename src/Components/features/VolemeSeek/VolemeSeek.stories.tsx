import { VolemeSeek } from "./VolemeSeek";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "features/VolemeSeek",
  component: VolemeSeek,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  argTypes: {
    voleme: {
      type: "number",
      control: { type: "range", min: 0, max: 1, step: 0.01 },
    },
    handleVolemeSeek: {
      action: "handleVolemeSeek",
    },
  },
} satisfies Meta<typeof VolemeSeek>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    voleme: 1,
  },
  parameters: {
    docs: {
      description: {
        component: `コンポーネントの説明マークダウン。`,
      },
    },
  },
};

export const Volme_0: Story = {
  args: {
    voleme: 0,
  },
  parameters: {
    docs: {
      description: {
        component: `コンポーネントの説明マークダウン。`,
      },
    },
  },
};
