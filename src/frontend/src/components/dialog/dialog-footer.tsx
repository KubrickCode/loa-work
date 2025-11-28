import { PropsWithChildren } from "react";

import { DialogFooter as ChakraDialogFooter } from "~/components/chakra/ui/dialog";

export const DialogFooter = ({ children }: PropsWithChildren) => (
  <ChakraDialogFooter>{children}</ChakraDialogFooter>
);
