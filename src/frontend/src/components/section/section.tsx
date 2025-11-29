import { Box, BoxProps, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

import { ErrorBoundary } from "~/components/error";

export type SectionProps = Omit<BoxProps, "title"> & {
  testId?: string;
  title?: ReactNode;
};

export const Section = ({ children, testId, title, ...props }: SectionProps) => {
  return (
    <Box
      bg="bg.container"
      border="1px solid"
      borderColor="border.subtle"
      borderRadius="md"
      boxShadow="md"
      data-testid={testId}
      p={{ base: 2, md: 4 }}
      w="100%"
      {...props}
    >
      <Flex direction="column" gap={{ base: 2, md: 4 }}>
        {title && (
          <Box fontSize="lg" fontWeight="semibold">
            {title}
          </Box>
        )}
        <ErrorBoundary>{children}</ErrorBoundary>
      </Flex>
    </Box>
  );
};
