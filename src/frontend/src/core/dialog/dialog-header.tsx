import { PropsWithChildren } from "react";

import {
  DialogHeader as ChakraDialogHeader,
  DialogTitle,
} from "~/core/chakra-components/ui/dialog";

export const DialogHeader = ({ children }: PropsWithChildren) => (
  <ChakraDialogHeader>
    <DialogTitle>{children}</DialogTitle>
  </ChakraDialogHeader>
);
