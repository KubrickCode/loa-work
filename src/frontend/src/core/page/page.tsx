import { StackProps, VStack } from "@chakra-ui/react";

export type PageProps = StackProps;

export const Page = (props: PageProps) => {
  return <VStack align="stretch" {...props} />;
};
