import { Box, BoxProps } from "@chakra-ui/react";

export type SectionProps = BoxProps;

export const Section = ({ children, ...props }: SectionProps) => {
  return (
    <Box w="100%" p={4} boxShadow="md" borderRadius="md" {...props}>
      {children}
    </Box>
  );
};
