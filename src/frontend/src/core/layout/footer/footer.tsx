import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <Flex
      as="footer"
      justifyContent="center"
      gap={4}
      p={2}
      mt="auto"
      width="100%"
    >
      <Link to="/privacy-policy">개인정보 처리방침</Link>
      <Link to={import.meta.env.VITE_KAKAO_OPEN_TALK_URL}>오픈채팅</Link>
    </Flex>
  );
};
