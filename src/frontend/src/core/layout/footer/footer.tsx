import { Flex, Link, List } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";

import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "~/core/chakra-components/ui/popover";
import { ItemStatUpdateToggleTip } from "~/shared/item";

export const Footer = () => {
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 100], ["100%", "0%"]);

  return (
    <motion.div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        y,
        zIndex: 1000,
      }}
    >
      <Flex
        _dark={{
          bg: "gray.900",
        }}
        as="footer"
        bg="gray.100"
        boxShadow="lg"
        fontSize="sm"
        gap={4}
        justifyContent="center"
        p={2}
        width="100%"
      >
        <Link href={import.meta.env.VITE_DISCORD_SERVER_LINK} target="_blank">
          디스코드
        </Link>
        <ItemStatUpdateToggleTip />
        <DonationPopover />
      </Flex>
    </motion.div>
  );
};

const DonationPopover = () => {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Link>후원 안내</Link>
      </PopoverTrigger>
      <PopoverContent fontSize="xs" portalled={false}>
        <PopoverArrow />
        <PopoverBody>
          <List.Root>
            <List.Item>후원 계좌: 농협 / 1199-02-020307 / 이승현</List.Item>
            <List.Item>
              개발자의 개인 시간과 사비로 운영되고 있습니다.
            </List.Item>
            <List.Item>
              사이트 퀄리티를 위해 광고를 가능한 추가하지 않습니다.
            </List.Item>
            <List.Item>
              프로젝트 유지를 위해 어느 정도 비용이 발생합니다.
            </List.Item>
            <List.Item>
              위와 같은 이유로 후원을 받고자 합니다. 감사합니다.
            </List.Item>
          </List.Root>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};
