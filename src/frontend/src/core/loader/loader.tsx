import { createListCollection, Flex, Spinner, VStack } from "@chakra-ui/react";

import {
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "~/core/chakra-components/ui/select";
import { SkeletonText } from "~/core/chakra-components/ui/skeleton";

export const TableSkeleton = ({ line }: { line: number }) => {
  return <SkeletonText gap="4" noOfLines={line} p={4} />;
};

export const PageLoader = () => {
  return (
    <Flex
      alignItems="center"
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <Spinner />
    </Flex>
  );
};

export const SelectLoader = () => {
  const frameworks = createListCollection({
    items: [],
  });

  return (
    <SelectRoot collection={frameworks} disabled maxWidth="10rem" size="xs">
      <SelectTrigger loading>
        <SelectValueText placeholder="loading..." />
      </SelectTrigger>
    </SelectRoot>
  );
};

export const BlockLoader = () => {
  return (
    <VStack justifyContent="center" minHeight="sm">
      <Spinner />
    </VStack>
  );
};
