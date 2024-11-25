import { createSystem, defaultConfig, ChakraProvider } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const chakraTheme = createSystem(defaultConfig);

export const ThemeProvider = ({ children }: PropsWithChildren) => (
  <ChakraProvider value={chakraTheme}>{children}</ChakraProvider>
);
