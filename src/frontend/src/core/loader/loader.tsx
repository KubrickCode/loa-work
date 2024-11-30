import { SkeletonText } from "~/chakra-components/ui/skeleton";

export const TableSkeleton = ({ line }: { line: number }) => {
  return <SkeletonText noOfLines={line} gap="4" p={4} />;
};
