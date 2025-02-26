import { PropsWithChildren } from "react";

import { DialogFooter as ChakraDialogFooter } from "~/core/chakra-components/ui/dialog";

export const DialogFooter = ({ children }: PropsWithChildren) => (
  <ChakraDialogFooter>{children}</ChakraDialogFooter>
);
