import { StackProps, VStack } from "@chakra-ui/react";
import { Suspense } from "react";

import { ErrorBoundary } from "../error";
import { Helmet } from "../helmet";
import { PageLoader } from "../loader";

export type PageProps = StackProps & {
  title: string;
};

export const Page = ({ children, title, ...otherProps }: PageProps) => {
  return (
    <>
      <Helmet title={title} />
      <VStack align="stretch" {...otherProps}>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>{children}</Suspense>
        </ErrorBoundary>
      </VStack>
    </>
  );
};
