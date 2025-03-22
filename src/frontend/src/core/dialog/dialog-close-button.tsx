import { Button } from "../chakra-components/ui/button";
import { DialogActionTrigger } from "../chakra-components/ui/dialog";

export const DialogCloseButton = () => (
  <DialogActionTrigger asChild>
    <Button onClick={(e) => e.stopPropagation()} variant="outline">
      닫기
    </Button>
  </DialogActionTrigger>
);
