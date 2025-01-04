import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <Flex as="footer" justifyContent="center" my={2} p={2}>
      <Link to="/privacy-policy">개인정보 처리방침</Link>
    </Flex>
  );
};
