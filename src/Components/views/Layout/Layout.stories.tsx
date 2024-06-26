import { Layout } from "./Layout";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "views/Layout",
  component: Layout,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    children: "children",
  },
  parameters: {
    docs: {
      description: {
        component: `コンポーネントの説明マークダウン。`,
      },
    },
  },
};

export const ScroolBar: Story = {
  args: {
    children: (
      <div style={{ height: "5000px" }}>
        {" "}
        <p>hoge</p>
      </div>
    ),
  },

  parameters: {
    docs: {
      description: {
        component: `コンポーネントの説明マークダウン。`,
      },
    },
  },
};
