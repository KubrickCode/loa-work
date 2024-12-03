import { Button } from "~/chakra-components/ui/button";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "~/core/dialog";

export const ContentRewardEditDialog = () => {
  return (
    <Dialog>
      <DialogHeader>보상 수정</DialogHeader>
      <Body />
      <DialogFooter>
        <Button>확인</Button>
      </DialogFooter>
    </Dialog>
  );
};

const Body = () => {
  return <DialogBody>Body</DialogBody>;
};
