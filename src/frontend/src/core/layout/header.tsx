import { Flex, Heading } from "@chakra-ui/react";

import { Avatar } from "~/chakra-components/ui/avatar";

import { Navigation } from "../navigation";

export const Header = () => {
  return (
    <Flex as="header" justifyContent="space-between">
      <Flex alignItems="center" gap={4}>
        <Heading>로생</Heading>
        <Navigation />
      </Flex>
      <Avatar size="md" />
    </Flex>
  );
};
