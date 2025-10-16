import { Flex } from "@chakra-ui/react";
import { FaDiscord } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";

import { Button } from "~/core/chakra-components/ui/button";
import { Dialog, DialogProps } from "~/core/dialog";

export const LoginDialog = (dialogProps: DialogProps) => {
  return (
    <Dialog {...dialogProps}>
      <Dialog.Header>로그인</Dialog.Header>
      <Dialog.Body>
        <Flex direction="column" gap={3}>
          <Button
            _hover={{ bg: "gray.50" }}
            bg="white"
            borderColor="gray.200"
            borderWidth={1}
            color="gray.700"
            onClick={() => {
              window.location.href = "/auth/google";
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
              window.location.href = "/auth/kakao";
            }}
          >
            <RiKakaoTalkFill /> 카카오로 계속하기
          </Button>
        </Flex>
      </Dialog.Body>
      <Dialog.Footer />
    </Dialog>
  );
};
