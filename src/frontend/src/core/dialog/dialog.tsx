import { PropsWithChildren } from "react";

import {
  DialogCloseTrigger,
  DialogContent,
} from "~/core/chakra-components/ui/dialog";

export const Dialog = ({ children, ...props }: PropsWithChildren) => (
  <DialogContent {...props}>
    {children}
    <DialogCloseTrigger />
  </DialogContent>
);
