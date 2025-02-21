import { createSystem, defaultConfig, ChakraProvider } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import "pretendard/dist/web/static/pretendard.css";

import { ColorModeProvider } from "~/core/chakra-components/ui/color-mode";

const chakraDefaultFontStack = `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;
const baseFontStack = `Pretendard, ${chakraDefaultFontStack}`;

const chakraTheme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: baseFontStack },
        body: { value: baseFontStack },
      },
    },
  },
});

export const ThemeProvider = ({ children }: PropsWithChildren) => (
  <ChakraProvider value={chakraTheme}>
    <ColorModeProvider>{children}</ColorModeProvider>
  </ChakraProvider>
);
