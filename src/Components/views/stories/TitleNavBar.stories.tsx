import { TitileNavBar } from "../TitileNavBar";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "views/TitileNavBar",
  component: TitileNavBar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof TitileNavBar>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Main: Story = {
  args: {},
};
