import { Flex, Heading } from "@chakra-ui/react";

import { Navigation } from "../../navigation";
import { HeaderMenu } from "./header-menu";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Flex as="header" justifyContent="space-between" p={2}>
      <Flex alignItems="center" gap={4}>
        <Link to="/">
          <Heading display={{ base: "none", md: "block" }}>로직장</Heading>
        </Link>
        <Navigation />
      </Flex>
      <HeaderMenu />
    </Flex>
  );
};
