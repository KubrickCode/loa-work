import { StackProps, VStack } from "@chakra-ui/react";
import { Suspense } from "react";

import { ErrorBoundary } from "../error";
import { Helmet } from "../helmet";
import { PageLoader } from "../loader";

export type PageProps = StackProps & {
  description: string;
  title: string;
};

export const Page = ({ children, description, title, ...otherProps }: PageProps) => {
  return (
    <>
      <Helmet description={description} title={title} />
      <VStack
        align="stretch"
        bg="bg.surface"
        border="1px solid"
        borderColor={{
          _dark: "border.subtle",
          _light: "border.default",
        }}
        borderRadius="xl"
        p={{ base: 4, md: 8 }}
        position="relative"
        shadow={{
          _dark: "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)",
          _light: "md",
        }}
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        {...otherProps}
      >
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>{children}</Suspense>
        </ErrorBoundary>
      </VStack>
    </>
  );
};
