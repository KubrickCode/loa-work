import { createListCollection, Flex, Spinner } from "@chakra-ui/react";
import {
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "~/chakra-components/ui/select";
import { SkeletonText } from "~/chakra-components/ui/skeleton";

export const TableSkeleton = ({ line }: { line: number }) => {
  return <SkeletonText noOfLines={line} gap="4" p={4} />;
};

export const Page = () => {
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

export const Select = () => {
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
