import type { SkeletonProps as ChakraSkeletonProps, CircleProps } from "@chakra-ui/react";
import { Skeleton as ChakraSkeleton, Circle, Stack } from "@chakra-ui/react";
import * as React from "react";

export type SkeletonCircleProps = {
  size?: CircleProps["size"];
} & ChakraSkeletonProps;

export const SkeletonCircle = React.forwardRef<HTMLDivElement, SkeletonCircleProps>(
  function SkeletonCircle(props, ref) {
    const { size, ...rest } = props;
    return (
      <Circle asChild ref={ref} size={size}>
        <ChakraSkeleton {...rest} />
      </Circle>
    );
  }
);

export type SkeletonTextProps = {
  noOfLines?: number;
} & ChakraSkeletonProps;

export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  function SkeletonText(props, ref) {
    const { gap, noOfLines = 3, ...rest } = props;
    return (
      <Stack gap={gap} ref={ref} width="full">
        {Array.from({ length: noOfLines }).map((_, index) => (
          <ChakraSkeleton height="4" key={index} {...props} _last={{ maxW: "80%" }} {...rest} />
        ))}
      </Stack>
    );
  }
);

export const Skeleton = ChakraSkeleton;
