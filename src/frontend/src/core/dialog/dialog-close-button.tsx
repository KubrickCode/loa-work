import { Button } from "../chakra-components/ui/button";
import { DialogActionTrigger } from "../chakra-components/ui/dialog";

export const DialogCloseButton = () => (
  <DialogActionTrigger asChild>
    <Button variant="outline">닫기</Button>
  </DialogActionTrigger>
);
