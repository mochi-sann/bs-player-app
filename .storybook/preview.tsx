// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import React, { useEffect } from "react";
// theme.ts file from previous step
import { theme } from "../src/lib/themes";
import { MantineProvider, useMantineColorScheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/core/styles.css";
import { addons } from "@storybook/preview-api";
import type { Preview } from "@storybook/react";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";

// theme.ts file from previous step

const channel = addons.getChannel();

function ColorSchemeWrapper({ children }: { children: React.ReactNode }) {
  const { setColorScheme } = useMantineColorScheme();
  const handleColorScheme = (value: boolean) =>
    setColorScheme(value ? "dark" : "light");

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);
    return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
  }, [channel]);

  return <>{children}</>;
}

export const decorators = [
  (renderStory: any) => (
    <ColorSchemeWrapper>{renderStory()}</ColorSchemeWrapper>
  ),
  (renderStory: any) => (
    <MantineProvider theme={theme}>{renderStory()}</MantineProvider>
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
