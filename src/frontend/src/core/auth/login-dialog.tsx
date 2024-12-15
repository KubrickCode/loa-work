import { Flex } from "@chakra-ui/react";
import { Button } from "~/chakra-components/ui/button";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "~/core/dialog";

export const LoginDialog = () => {
  return (
    <Dialog>
      <DialogHeader>로그인</DialogHeader>
      <Body />
    </Dialog>
  );
};

const Body = () => {
  return (
    <>
      <DialogBody>
        <Flex direction="column" gap={2}>
          <Button
            onClick={() => {
              window.location.href = "/auth/google";
            }}
          >
            구글 로그인
          </Button>
          <Button
            onClick={() => {
              window.location.href = import.meta.env.VITE_DISCORD_LOGIN_URL;
            }}
          >
            디스코드 로그인
          </Button>
          <Button
            onClick={() => {
              window.location.href = "/auth/kakao";
            }}
          >
            카카오 로그인
          </Button>
        </Flex>
      </DialogBody>
      <DialogFooter />
    </>
  );
};
