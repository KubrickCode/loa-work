import { Flex, Text } from "@chakra-ui/react";
import { InfoTip } from "~/chakra-components/ui/toggle-tip";
import { useSafeQuery } from "~/core/graphql";
import { ItemStatUpdateToggleTipDocument } from "~/core/graphql/generated";
import dayjs from "dayjs";

export const ItemStatUpdateToggleTip = () => {
  return (
    <Flex alignItems="center" gap={1}>
      <Text fontSize="xs">마지막 시세 업데이트 시간</Text>
      <InfoTip content={<Content />} />
    </Flex>
  );
};

const Content = () => {
  const { data } = useSafeQuery(ItemStatUpdateToggleTipDocument, {
    variables: {
      take: 1,
      orderBy: [{ field: "createdAt", order: "desc" }],
    },
  });

  const formatDate = (date: Date) =>
    date ? dayjs(date).format("YYYY-MM-DD HH:mm") : "정보 없음";

  return (
    <Flex direction="column" gap={2} p={2}>
      <Text>
        거래소 아이템: {formatDate(data.marketItemStats[0]?.createdAt)}
      </Text>
      <Text>
        경매장 아이템: {formatDate(data.auctionItemStats[0]?.createdAt)}
      </Text>
    </Flex>
  );
};
