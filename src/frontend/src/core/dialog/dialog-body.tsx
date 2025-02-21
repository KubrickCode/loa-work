import { PropsWithChildren } from "react";

import { DialogBody as ChakraDialogBody } from "~/core/chakra-components/ui/dialog";

export const DialogBody = ({ children }: PropsWithChildren) => (
  <ChakraDialogBody>{children}</ChakraDialogBody>
);
