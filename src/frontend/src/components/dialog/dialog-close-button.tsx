import { Button } from "~/components/chakra/ui/button";
import { DialogActionTrigger } from "~/components/chakra/ui/dialog";

export const DialogCloseButton = () => (
  <DialogActionTrigger asChild>
    <Button onClick={(e) => e.stopPropagation()} variant="outline">
      닫기
    </Button>
  </DialogActionTrigger>
);
