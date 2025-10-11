import { Flex, Heading, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { HeaderMenu } from "./header-menu";
import { Navigation } from "../../navigation";

export const Header = () => {
  return (
    <Box
      as="header"
      backdropFilter="blur(12px)"
      bg={{
        _dark: "neutral.850",
        _light: "bg.surface",
      }}
      borderBottomWidth="1px"
      borderColor="border.default"
      position="sticky"
      role="banner"
      shadow="sm"
      top={0}
      zIndex={1000}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        px={{ base: 4, md: 6 }}
        py={4}
        w="100%"
      >
        <Flex alignItems="center" gap={{ base: 2, md: 6 }}>
          <Link aria-label="로직장 홈으로 이동" to="/">
            <Heading
              as="h1"
              color="text.primary"
              display={{ base: "none", md: "block" }}
              fontSize={{ base: "lg", md: "2xl" }}
              fontWeight="bold"
            >
              로직장
            </Heading>
          </Link>
          <Navigation />
        </Flex>
        <HeaderMenu />
      </Flex>
    </Box>
  );
};
