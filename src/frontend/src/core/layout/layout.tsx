import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return <Flex>{children}</Flex>;
};
