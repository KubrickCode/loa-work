import { StackProps, VStack } from "@chakra-ui/react";
import { ErrorBoundary } from "../error";

export type PageProps = StackProps;

export const Page = ({ children, ...otherProps }: PageProps) => {
  return (
    <VStack align="stretch" {...otherProps}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </VStack>
  );
};
