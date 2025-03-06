import { StackProps, VStack } from "@chakra-ui/react";
import { Suspense } from "react";

import { ErrorBoundary } from "../error";
import { PageLoader } from "../loader";

export type PageProps = StackProps;

export const Page = ({ children, ...otherProps }: PageProps) => {
  return (
    <VStack align="stretch" {...otherProps}>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>{children}</Suspense>
      </ErrorBoundary>
    </VStack>
  );
};
