import { Box, Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

import { Header } from "./header";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Flex direction="column">
      <Header />
      <Box as="main">{children}</Box>
    </Flex>
  );
};
