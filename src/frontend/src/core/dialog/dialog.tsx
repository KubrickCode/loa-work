import { Portal } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

import { DialogBackdrop, DialogRoot } from "~/core/chakra-components/ui/dialog";

import { DialogBody } from "./dialog-body";
import { DialogCloseButton } from "./dialog-close-button";
import { DialogContent } from "./dialog-content";
import { DialogFooter } from "./dialog-footer";
import { DialogHeader } from "./dialog-header";
import { DialogTrigger } from "./dialog-trigger";

export type DialogProps = PropsWithChildren & {
  onClose: () => void;
  open: boolean;
};

const Dialog = ({ children, onClose, open }: DialogProps) => {
  return (
    <DialogRoot
      lazyMount
      modal={false}
      onOpenChange={onClose}
      open={open}
      scrollBehavior="inside"
    >
      <Portal>
        <DialogBackdrop />
        {children}
      </Portal>
    </DialogRoot>
  );
};

Dialog.Body = DialogBody;
Dialog.CloseButton = DialogCloseButton;
Dialog.Content = DialogContent;
Dialog.Footer = DialogFooter;
Dialog.Header = DialogHeader;
Dialog.Trigger = DialogTrigger;

export { Dialog };
