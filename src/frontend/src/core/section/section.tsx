import { Box, BoxProps, Flex } from "@chakra-ui/react";
import { ErrorBoundary } from "../error";

export type SectionProps = BoxProps;

export const Section = ({ children, ...props }: SectionProps) => {
  return (
    <Box w="100%" p={4} boxShadow="md" borderRadius="md" {...props}>
      <Flex direction="column" gap={4}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Flex>
    </Box>
  );
};
