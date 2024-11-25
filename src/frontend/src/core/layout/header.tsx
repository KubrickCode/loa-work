import { Flex, Heading } from "@chakra-ui/react";

import { Navigation } from "../navigation";

export const Header = () => {
  return (
    <Flex as="header" alignItems="center" gap={4}>
      <Heading>로생</Heading>
      <Navigation />
    </Flex>
  );
};
