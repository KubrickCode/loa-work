import { Flex, Heading } from "@chakra-ui/react";

import { Navigation } from "../../navigation";
import { HeaderMenu } from "./header-menu";

export const Header = () => {
  return (
    <Flex as="header" justifyContent="space-between" p={2}>
      <Flex alignItems="center" gap={4}>
        <Heading>로생체크</Heading>
        <Navigation />
      </Flex>
      <HeaderMenu />
    </Flex>
  );
};
