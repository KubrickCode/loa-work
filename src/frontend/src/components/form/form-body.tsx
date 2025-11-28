import { Flex, FlexProps } from "@chakra-ui/react";

export type FormBodyProps = FlexProps;

export const FormBody = (props: FormBodyProps) => <Flex direction="column" gap={4} {...props} />;
