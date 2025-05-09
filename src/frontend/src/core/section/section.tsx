import { Box, BoxProps, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

import { ErrorBoundary } from "../error";

export type SectionProps = Omit<BoxProps, "title"> & {
  title?: ReactNode;
};

export const Section = ({ children, title, ...props }: SectionProps) => {
  return (
    <Box borderRadius="md" boxShadow="md" p={4} w="100%" {...props}>
      <Flex direction="column" gap={4}>
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
