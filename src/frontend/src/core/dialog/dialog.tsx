import { PropsWithChildren } from "react";

import { DialogContent, DialogRoot } from "~/core/chakra-components/ui/dialog";

export type DialogProps = PropsWithChildren & {
  onClose: () => void;
  open: boolean;
};

export const Dialog = ({ children, onClose, open }: DialogProps) => {
  return (
    <DialogRoot lazyMount modal={false} onOpenChange={onClose} open={open}>
      <DialogContent>{children}</DialogContent>
    </DialogRoot>
  );
};
