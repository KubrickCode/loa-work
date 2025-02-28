import { DialogContentProps } from "@chakra-ui/react";

import {
  DialogContent as ChakraDialogContent,
  DialogCloseTrigger,
} from "../chakra-components/ui/dialog";

export const DialogContent = ({
  children,
  ...otherProps
}: DialogContentProps) => (
  <ChakraDialogContent portalled={false} {...otherProps}>
    {children}
    <DialogCloseTrigger />
  </ChakraDialogContent>
);
