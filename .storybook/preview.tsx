// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import React, { useEffect } from "react";
import { ThemeProvider } from "../src/Components/ui/theme-provider";
import "../src/styles.css";
// theme.ts file from previous step
import { addons } from "@storybook/preview-api";
import type { Preview } from "@storybook/react";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";

// theme.ts file from previous step
export const decorators = [
  (renderStory: any) => (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {renderStory()}
    </ThemeProvider>
  ),
];
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
