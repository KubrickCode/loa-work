import { StackProps, VStack } from "@chakra-ui/react";
import { ErrorBoundary } from "../error";
import { Suspense } from "react";
import { Loader } from "../loader";

export type PageProps = StackProps;

export const Page = ({ children, ...otherProps }: PageProps) => {
  return (
    <VStack align="stretch" {...otherProps}>
      <ErrorBoundary>
        <Suspense fallback={<Loader.Page />}>{children}</Suspense>
      </ErrorBoundary>
    </VStack>
  );
};
