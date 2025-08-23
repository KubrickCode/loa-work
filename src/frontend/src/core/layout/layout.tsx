import { Box, Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

import { Toaster } from "~/core/chakra-components/ui/toaster";

import { Footer } from "./footer";
import { Header } from "./header";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      direction="column"
      minH="100vh"
      px={{ base: 0, md: 8 }}
      py={{ base: 0, md: 4 }}
    >
      <Header />
      <Box as="main" p={3} pb={12}>
        {children}
      </Box>
      <Footer />
      <Toaster />
    </Flex>
  );
};
