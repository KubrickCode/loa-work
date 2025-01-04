import { Box, Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

import { Header } from "./header";
import { Toaster } from "~/chakra-components/ui/toaster";
import { Footer } from "./footer";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Flex direction="column" px={{ base: 0, md: 8 }} py={{ base: 0, md: 4 }}>
      <Header />
      <Box as="main" p={3}>
        {children}
      </Box>
      <Footer />
      <Toaster />
    </Flex>
  );
};
