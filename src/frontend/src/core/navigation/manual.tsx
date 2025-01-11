import { Button } from "@chakra-ui/react";
import { HiOutlineBookOpen } from "react-icons/hi";

import {
  DrawerRoot,
  DrawerTrigger,
  DrawerContent,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerBackdrop,
  DrawerHeader,
  DrawerTitle,
} from "~/chakra-components/ui/drawer";

export const Manual = () => {
  return (
    <DrawerRoot>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button justifyContent="flex-start" variant="outline">
          <HiOutlineBookOpen />
          설명서
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>설명서</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>TODO: 설명서 작성</DrawerBody>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};
