import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { HiOutlineBookOpen } from "react-icons/hi";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "~/chakra-components/ui/accordion";
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
    <DrawerRoot modal={false} size="xl">
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
        <DrawerBody>
          <AccordionRoot collapsible defaultValue={["0"]}>
            {accordionItems.map((item, index) => (
              <AccordionItem key={index} value={index.toString()}>
                <AccordionItemTrigger>{item.title}</AccordionItemTrigger>
                <AccordionItemContent>{item.paragraph}</AccordionItemContent>
              </AccordionItem>
            ))}
          </AccordionRoot>
        </DrawerBody>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};

const accordionItems = [
  {
    title: "각종 문의 사항",
    paragraph: (
      <Flex flexWrap="wrap" gap={1}>
        <Link
          color="blue.500"
          href="https://open.kakao.com/o/g05VYL8g"
          target="_blank"
        >
          카카오톡 오픈채팅방
        </Link>
        <Text>에서 문의해주세요.</Text>
      </Flex>
    ),
  },
  {
    title: "데이터 수집 방식",
    paragraph: (
      <>
        <Text>
          과도한 API 호출 방지 및 서버 부하 이슈를 줄이기 위해 데이터는 10분
          주기로 수집되어 데이터베이스에 저장됩니다.
        </Text>
        <Text>데이터는 로스트아크 공식 API를 통해 수집됩니다.</Text>
        <Text>
          히스토리를 위해 데이터는 계속 축적되고 있으며, 추후 다양한 방식으로
          활용될 수 있습니다.
        </Text>
      </>
    ),
  },
  {
    title: "아이템 가격 계산 방식",
    paragraph: (
      <>
        <Box>
          <Flex flexWrap="wrap" gap={1}>
            <Text>
              각 컨텐츠에서 얻을 수 있는 아이템의 "개당 가격"은 다음과 같이
              계산되며,
            </Text>
            <Link color="blue.500" href="/item-price-list" target="_blank">
              아이템 시세 페이지
            </Link>
            <Text>에서 확인할 수 있습니다.</Text>
          </Flex>
          <Box marginLeft={2}>
            <Text>- 거래소 아이템: 가장 최근 수집된 데이터의 최저가</Text>
            <Text>
              - 경매장 아이템: 가장 최근 수집된 10개 데이터의 평균 즉시 구매가
            </Text>
          </Box>
        </Box>
        <Text>
          실링과 카드 경험치같이 가격을 측정하기 어려운 재화는 로그인 후 직접
          설정할 수 있습니다.
        </Text>
      </>
    ),
  },
  {
    title: "컨텐츠별 보상 책정 방식",
    paragraph: (
      <>
        <Flex flexWrap="wrap" gap={1}>
          <Text>컨텐츠에서 수급 가능한 보상은</Text>
          <Link color="blue.500" href="/content-reward-list" target="_blank">
            컨텐츠별 보상 페이지
          </Link>
          <Text>에서 확인할 수 있습니다.</Text>
        </Flex>
        <Text>
          해당 보상은 기본적으로 웹 서칭 + 개발자 개인적인 인게임 플레이 통계를
          바탕으로 책정되었습니다.
        </Text>
        <Text>
          매 번 이런식으로 유지보수 될 수 없기 때문에 앞으로는 제보되는 데이터를
          바탕으로 기본값은 업데이트하고자 합니다.
        </Text>
        <Flex flexWrap="wrap" gap={1}>
          <Text>
            또한 해당 데이터는 로스트아크에서 제공하지 않아 정확할 수 없는
            데이터이기에
          </Text>
          <Link color="blue.500" href="/content-reward-list" target="_blank">
            컨텐츠별 보상 페이지
          </Link>
          <Text>에서 로그인 후 직접 수정하실 수 있습니다.</Text>
        </Flex>
      </>
    ),
  },
  {
    title: "시급 책정 방식",
    paragraph: (
      <>
        <Text>
          시급은 앞서 책정된 아이템 가격 및 컨텐츠별 드랍 아이템을 기반으로
          계산됩니다.
        </Text>
        <Text>
          계산식에는 컨텐츠별 소요시간이 요구되며, 이는 로그인 후 직접 설정할 수
          있습니다.
        </Text>
        <Text>
          또한 실제 현금가치로 계산하기 위해 골드 환율이 필요하며, 이는 로그인
          후 직접 설정할 수 있습니다.(기본값: 100골드당 50원)
        </Text>
        <Text>
          시급 계산기 기능을 통해 등록되지 않은 가상의 컨텐츠의 시급을 책정해볼
          수 있습니다.
        </Text>
      </>
    ),
  },
];
