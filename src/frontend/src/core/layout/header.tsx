import { Flex } from "@chakra-ui/react";

import { Navigation } from "../navigation";

export const Header = () => {
  return (
    <Flex as="header">
      <>Header</>
      <Navigation />
    </Flex>
  );
};
