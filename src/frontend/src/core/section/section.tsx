import { Box, BoxProps, Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

import { ErrorBoundary } from "../error";

export type SectionProps = BoxProps & {
  title?: ReactNode;
};

export const Section = ({ children, title, ...props }: SectionProps) => {
  return (
    <Box w="100%" p={4} boxShadow="md" borderRadius="md" {...props}>
      <Flex direction="column" gap={4}>
        {title && (
          <Text fontSize="lg" fontWeight="semibold">
            {title}
          </Text>
        )}
        <ErrorBoundary>{children}</ErrorBoundary>
      </Flex>
    </Box>
  );
};
