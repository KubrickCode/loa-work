import { Flex } from "@chakra-ui/react";
import { FaDiscord } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";

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
        <Flex direction="column" gap={3}>
          <Button
            _hover={{ bg: "gray.50" }}
            bg="white"
            borderColor="gray.200"
            borderWidth={1}
            color="gray.700"
            onClick={() => {
              window.location.href = import.meta.env.VITE_GOOGLE_LOGIN_URL;
            }}
          >
            <FcGoogle /> Google로 계속하기
          </Button>
          <Button
            _hover={{ bg: "#4752C4" }}
            bg="#5865F2"
            color="white"
            onClick={() => {
              window.location.href = import.meta.env.VITE_DISCORD_LOGIN_URL;
            }}
          >
            <FaDiscord /> Discord로 계속하기
          </Button>
          <Button
            _hover={{ bg: "#FDD835" }}
            bg="#FEE500"
            color="rgba(0,0,0,0.85)"
            onClick={() => {
              window.location.href = import.meta.env.VITE_KAKAO_LOGIN_URL;
            }}
          >
            <RiKakaoTalkFill /> 카카오로 계속하기
          </Button>
        </Flex>
      </DialogBody>
      <DialogFooter />
    </>
  );
};
