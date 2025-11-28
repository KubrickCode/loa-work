import { DialogContentProps } from "@chakra-ui/react";

import {
  DialogContent as ChakraDialogContent,
  DialogCloseTrigger,
} from "~/components/chakra/ui/dialog";

export const DialogContent = ({ children, ...otherProps }: DialogContentProps) => (
  <ChakraDialogContent
    onClick={(e) => e.stopPropagation()}
    onKeyDown={(e) => e.stopPropagation()}
    onTouchStart={(e) => e.stopPropagation()}
    portalled={false}
    {...otherProps}
  >
    {children}
    <DialogCloseTrigger />
  </ChakraDialogContent>
);
