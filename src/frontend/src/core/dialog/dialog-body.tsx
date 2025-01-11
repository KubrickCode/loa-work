import { PropsWithChildren } from "react";

import { DialogBody as ChakraDialogBody } from "~/chakra-components/ui/dialog";

export const DialogBody = ({ children }: PropsWithChildren) => (
  <ChakraDialogBody>{children}</ChakraDialogBody>
);
