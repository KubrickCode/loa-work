import { Flex, Link } from "@chakra-ui/react";

import { ItemStatUpdateToggleTip } from "~/shared/item";

export const Footer = () => {
  return (
    <Flex
      as="footer"
      fontSize="sm"
      gap={4}
      justifyContent="center"
      mt="auto"
      p={2}
      width="100%"
    >
      <Link href="/privacy-policy" target="_blank">
        개인정보처리방침
      </Link>
      <Link href={import.meta.env.VITE_KAKAO_OPEN_TALK_URL} target="_blank">
        오픈채팅
      </Link>
      <ItemStatUpdateToggleTip />
    </Flex>
  );
};
