import { Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { HeaderMenu } from "./header-menu";
import { Navigation } from "../../navigation";

export const Header = () => {
  return (
    <Flex as="header" justifyContent="space-between" p={2}>
      <Flex alignItems="center" gap={{ base: 0, md: 4 }}>
        <Link to="/">
          <Heading display={{ base: "none", md: "block" }}>로직장</Heading>
        </Link>
        <Navigation />
      </Flex>
      <HeaderMenu />
    </Flex>
  );
};
