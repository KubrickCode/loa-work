import { PropsWithChildren } from "react";

import { Button } from "~/chakra-components/ui/button";
import {
  DialogFooter as ChakraDialogFooter,
  DialogActionTrigger,
} from "~/chakra-components/ui/dialog";

export const DialogFooter = ({ children }: PropsWithChildren) => (
  <ChakraDialogFooter>
    <DialogActionTrigger asChild>
      <Button variant="outline">닫기</Button>
    </DialogActionTrigger>
    {children}
  </ChakraDialogFooter>
);
