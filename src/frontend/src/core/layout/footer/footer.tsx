import { Flex, Link, List } from "@chakra-ui/react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "~/core/chakra-components/ui/popover";
import { ItemStatUpdateToggleTip } from "~/shared/item";

const SCROLL_BOTTOM_THRESHOLD = 10;

export const Footer = () => {
  const { scrollY } = useScroll();
  const [isAtBottom, setIsAtBottom] = useState(false);

  const scrollState = useTransform(scrollY, (latest) => {
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollableHeight = documentHeight - windowHeight;

    const hasEnoughContent = scrollableHeight > 50;

    const result = hasEnoughContent
      ? latest >= scrollableHeight - SCROLL_BOTTOM_THRESHOLD
      : false;

    return result;
  });

  useMotionValueEvent(scrollState, "change", (latest) => {
    setIsAtBottom(latest);
  });

  return (
    <Flex
      _dark={{
        bg: isAtBottom ? "transparent" : "gray.900",
        borderTopColor: isAtBottom ? "transparent" : "gray.700",
      }}
      as="footer"
      bg={isAtBottom ? "transparent" : "white"}
      borderTop={isAtBottom ? "none" : "1px solid"}
      borderTopColor={isAtBottom ? "transparent" : "gray.200"}
      bottom={0}
      boxShadow={isAtBottom ? "none" : "lg"}
      fontSize="sm"
      gap={4}
      justifyContent="center"
      left={0}
      p={3}
      position="fixed"
      right={0}
      style={{
        transition: "all 0.3s ease",
      }}
      width="100%"
      zIndex={1000}
    >
      <Link href={import.meta.env.VITE_DISCORD_SERVER_LINK} target="_blank">
        디스코드
      </Link>
      <ItemStatUpdateToggleTip />
      <DonationPopover />
    </Flex>
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
