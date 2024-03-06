import { NavBar } from "./NavBar";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "views/NavBar",
  component: NavBar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        component: `コンポーネントの説明マークダウン。`,
      },
    },
  },
};
