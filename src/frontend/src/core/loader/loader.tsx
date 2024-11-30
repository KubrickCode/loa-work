import { Flex, Spinner } from "@chakra-ui/react";
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
