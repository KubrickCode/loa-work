import { createSystem, defaultConfig, defineConfig, ChakraProvider } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import "pretendard/dist/web/static/pretendard.css";

import { ColorModeProvider } from "~/components/chakra/ui/color-mode";

const chakraDefaultFontStack = `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;
const baseFontStack = `Pretendard, ${chakraDefaultFontStack}`;

const config = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        bg: {
          accent: {
            value: {
              _dark: "rgba(255, 215, 0, 0.12)",
              _light: "rgba(255, 215, 0, 0.1)",
            },
          },

          canvas: {
            value: {
              _dark: "#09090B",
              _light: "#FFFFFF",
            },
          },

          container: {
            value: {
              _dark: "{colors.neutral.900}",
              _light: "#FFFFFF",
            },
          },

          elevated: {
            value: {
              _dark: "#27272A",
              _light: "#FFFFFF",
            },
          },

          favorite: {
            value: {
              _dark: "rgba(255, 215, 0, 0.04)",
              _light: "rgba(255, 215, 0, 0.04)",
            },
          },
          favoriteHover: {
            value: {
              _dark: "rgba(255, 215, 0, 0.12)",
              _light: "rgba(255, 215, 0, 0.12)",
            },
          },
          hover: {
            value: {
              _dark: "rgba(255, 215, 0, 0.07)",
              _light: "rgba(255, 215, 0, 0.07)",
            },
          },
          muted: {
            value: {
              _dark: "#3F3F46",
              _light: "#FFFFFF",
            },
          },
          overlay: {
            value: {
              _dark: "rgba(0, 0, 0, 0.7)",
              _light: "rgba(0, 0, 0, 0.5)",
            },
          },

          surface: {
            value: { _dark: "#18181B", _light: "white" },
          },
        },

        border: {
          default: {
            value: {
              _dark: "rgba(255, 255, 255, 0.10)",
              _light: "rgba(0, 0, 0, 0.08)",
            },
          },
          emphasis: {
            value: {
              _dark: "rgba(255, 255, 255, 0.15)",
              _light: "rgba(0, 0, 0, 0.12)",
            },
          },
          subtle: {
            value: {
              _dark: "rgba(255, 255, 255, 0.06)",
              _light: "rgba(0, 0, 0, 0.04)",
            },
          },
        },

        text: {
          muted: {
            value: { _dark: "#71717A", _light: "#71717A" },
          },
          primary: {
            value: { _dark: "#F8F9FA", _light: "#09090B" },
          },
          secondary: {
            value: { _dark: "#A1A1AA", _light: "#3F3F46" },
          },
        },
      },
    },
    tokens: {
      colors: {
        error: { 500: { value: "#EF4444" } },

        gold: {
          500: { value: "#CCAD00" },
        },

        neutral: {
          100: { value: "#F4F4F5" },
          200: { value: "#E4E4E7" },
          25: { value: "#FFFFFF" },
          300: { value: "#D4D4D8" },
          400: { value: "#A1A1AA" },
          50: { value: "#FAFAFA" },
          500: { value: "#71717A" },
          600: { value: "#52525B" },
          700: { value: "#3F3F46" },
          800: { value: "#27272A" },
          850: { value: "#18181B" },
          900: { value: "#09090B" },
          950: { value: "#030304" },
        },
        success: { 500: { value: "#10B981" } },
      },
      fonts: {
        body: { value: baseFontStack },
        heading: { value: baseFontStack },
      },
      fontSizes: {
        "2xl": { value: "1.25rem" },
        "2xs": { value: "0.625rem" },
        "3xl": { value: "1.5rem" },
        "4xl": { value: "1.875rem" },
        "5xl": { value: "2.25rem" },
        "6xl": { value: "3rem" },
        md: { value: "1rem" },
        sm: { value: "0.875rem" },
        xl: { value: "1.125rem" },
        xs: { value: "0.75rem" },
      },
      fontWeights: {
        bold: { value: 700 },
        extrabold: { value: 800 },
        light: { value: 300 },
        medium: { value: 500 },
        normal: { value: 400 },
        semibold: { value: 600 },
      },
      lineHeights: {
        loose: { value: 2 },
        none: { value: 1 },
        normal: { value: 1.5 },
        relaxed: { value: 1.625 },
        snug: { value: 1.375 },
        tight: { value: 1.25 },
      },
      radii: {
        "2xl": { value: "1.75rem" },
        "2xs": { value: "0.125rem" },
        "3xl": { value: "2rem" },
        full: { value: "9999px" },
        lg: { value: "1rem" },
        md: { value: "0.75rem" },
        none: { value: "0" },
        sm: { value: "0.5rem" },
        xl: { value: "1.25rem" },
        xs: { value: "0.25rem" },
      },
      shadows: {
        "2xl": {
          value: "0 32px 64px rgba(0, 0, 0, 0.25), 0 12px 24px rgba(0, 0, 0, 0.18)",
        },
        inner: { value: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)" },
        lg: {
          value: "0 12px 24px rgba(0, 0, 0, 0.18), 0 6px 12px rgba(0, 0, 0, 0.12)",
        },
        md: {
          value: "0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)",
        },
        none: { value: "none" },
        sm: {
          value: "0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)",
        },
        xl: {
          value: "0 20px 40px rgba(0, 0, 0, 0.22), 0 8px 16px rgba(0, 0, 0, 0.15)",
        },
        xs: {
          value: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.05)",
        },
      },
      spacing: {
        "0.5": { value: "0.125rem" }, // 2px
        "1": { value: "0.25rem" }, // 4px
        "1.5": { value: "0.375rem" }, // 6px
        "10": { value: "2.5rem" }, // 40px
        "12": { value: "3rem" }, // 48px
        "14": { value: "3.5rem" }, // 56px
        "16": { value: "4rem" }, // 64px
        "2": { value: "0.5rem" }, // 8px
        "2.5": { value: "0.625rem" }, // 10px
        "20": { value: "5rem" }, // 80px
        "24": { value: "6rem" }, // 96px
        "3": { value: "0.75rem" }, // 12px
        "3.5": { value: "0.875rem" }, // 14px
        "4": { value: "1rem" }, // 16px
        "5": { value: "1.25rem" }, // 20px
        "6": { value: "1.5rem" }, // 24px
        "7": { value: "1.75rem" }, // 28px
        "8": { value: "2rem" }, // 32px
        "9": { value: "2.25rem" }, // 36px
      },
    },
  },
});

const chakraTheme = createSystem(defaultConfig, config);

export default chakraTheme;

export const ThemeProvider = ({ children }: PropsWithChildren) => (
  <ChakraProvider value={chakraTheme}>
    <ColorModeProvider>{children}</ColorModeProvider>
  </ChakraProvider>
);
