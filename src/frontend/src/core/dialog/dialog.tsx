import { PropsWithChildren } from "react";

import { DialogBackdrop, DialogRoot } from "~/core/chakra-components/ui/dialog";

export type DialogProps = PropsWithChildren & {
  onClose: () => void;
  open: boolean;
};

export const Dialog = ({ children, onClose, open }: DialogProps) => {
  return (
    <DialogRoot lazyMount modal={false} onOpenChange={onClose} open={open}>
      <DialogBackdrop />
      {children}
    </DialogRoot>
  );
};
