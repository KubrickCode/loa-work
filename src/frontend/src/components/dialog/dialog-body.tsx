import { PropsWithChildren } from "react";

import { DialogBody as ChakraDialogBody } from "~/components/chakra/ui/dialog";

export const DialogBody = ({ children }: PropsWithChildren) => (
  <ChakraDialogBody>{children}</ChakraDialogBody>
);
