import { StackProps, VStack } from "@chakra-ui/react";
import { Suspense } from "react";

import { ErrorBoundary } from "../error";
import { Helmet } from "../helmet";
import { PageLoader } from "../loader";

export type PageProps = StackProps & {
  title: string;
  description: string;
};

export const Page = ({
  children,
  title,
  description,
  ...otherProps
}: PageProps) => {
  return (
    <>
      <Helmet description={description} title={title} />
      <VStack align="stretch" {...otherProps}>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>{children}</Suspense>
        </ErrorBoundary>
      </VStack>
    </>
  );
};
