// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import React, { useEffect } from "react";
import { I18nProvider } from "../src/Components/Provider/I18n";
import { ThemeProvider } from "../src/Components/ui/theme-provider";
import "../src/styles.css";
import { withThemeByClassName } from "@storybook/addon-themes";
// theme.ts file from previous step
import { addons } from "@storybook/preview-api";
import type { Preview } from "@storybook/react";

// theme.ts file from previous step
export const decorators = [
  (renderStory: any) => (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <I18nProvider>
        <div className="bg-red-600">{renderStory()}</div>
      </I18nProvider>
    </ThemeProvider>
  ),
  withThemeByClassName({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "dark",
  }),
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
