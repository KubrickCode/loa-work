import { PropsWithChildren } from "react";

import { Button } from "~/core/chakra-components/ui/button";
import {
  DialogFooter as ChakraDialogFooter,
  DialogActionTrigger,
} from "~/core/chakra-components/ui/dialog";

export const DialogFooter = ({ children }: PropsWithChildren) => (
  <ChakraDialogFooter>
    <DialogActionTrigger asChild>
      <Button variant="outline">닫기</Button>
    </DialogActionTrigger>
    {children}
  </ChakraDialogFooter>
);
