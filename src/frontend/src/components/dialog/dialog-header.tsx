import { PropsWithChildren } from "react";

import { DialogHeader as ChakraDialogHeader, DialogTitle } from "~/components/chakra/ui/dialog";

export const DialogHeader = ({ children }: PropsWithChildren) => (
  <ChakraDialogHeader>
    <DialogTitle>{children}</DialogTitle>
  </ChakraDialogHeader>
);
