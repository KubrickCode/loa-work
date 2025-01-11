import { ReactNode, useState } from "react";

import {
  DialogTrigger as ChakraDialogTrigger,
  DialogRoot,
} from "~/chakra-components/ui/dialog";

export type DialogTriggerProps = {
  dialog: ReactNode;
  trigger: ReactNode;
};

export const DialogTrigger = ({ dialog, trigger }: DialogTriggerProps) => {
  const [open, setOpen] = useState(false);
  return (
    <DialogRoot lazyMount onOpenChange={(e) => setOpen(e.open)} open={open}>
      <ChakraDialogTrigger asChild>{trigger}</ChakraDialogTrigger>
      {dialog}
    </DialogRoot>
  );
};
