import { Flex, Heading } from "@chakra-ui/react";

import { Navigation } from "../../navigation";
import { HeaderMenu } from "./header-menu";

export const Header = () => {
  return (
    <Flex as="header" justifyContent="space-between" p={2}>
      <Flex alignItems="center" gap={4}>
        <Heading display={{ base: "none", md: "block" }}>타이틀미정</Heading>
        <Navigation />
      </Flex>
      <HeaderMenu />
    </Flex>
  );
};
