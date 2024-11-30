import { Flex, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

type SplitLayoutProps = {
  firstGroup: ReactNode;
  secondGroup: ReactNode;
};

export const SplitLayout = ({ firstGroup, secondGroup }: SplitLayoutProps) => {
  return (
    <Flex direction={{ base: "column", md: "row" }} gap={4}>
      <VStack flex="1" gap={4}>
        {firstGroup}
      </VStack>
      <VStack flex="1" gap={4}>
        {secondGroup}
      </VStack>
    </Flex>
  );
};
