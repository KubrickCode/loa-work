import { Flex, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

import { ErrorBoundary } from "../error";

type SplitLayoutProps = {
  firstGroup: ReactNode;
  secondGroup: ReactNode;
};

export const SplitLayout = ({ firstGroup, secondGroup }: SplitLayoutProps) => {
  return (
    <Flex direction={{ base: "column", md: "row" }} gap={4}>
      <VStack flex="1" gap={4} minW={0}>
        <ErrorBoundary>{firstGroup}</ErrorBoundary>
      </VStack>
      <VStack flex="1" gap={4} minW={0}>
        <ErrorBoundary>{secondGroup}</ErrorBoundary>
      </VStack>
    </Flex>
  );
};
