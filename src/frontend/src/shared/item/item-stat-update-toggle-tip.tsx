import { Flex, Spinner, Text } from "@chakra-ui/react";
import { InfoTip } from "~/chakra-components/ui/toggle-tip";
import { useQuery } from "~/core/graphql";
import { ItemStatUpdateToggleTipDocument } from "~/core/graphql/generated";
import { formatDateTime } from "~/core/format";

export const ItemStatUpdateToggleTip = () => {
  return (
    <Flex alignItems="center" gap={1}>
      <Text fontSize="xs">아이템 시세 갱신 일시</Text>
      <InfoTip content={<Content />} />
    </Flex>
  );
};

const Content = () => {
  const { data, loading, error } = useQuery(ItemStatUpdateToggleTipDocument, {
    variables: {
      take: 1,
      orderBy: [{ field: "createdAt", order: "desc" }],
    },
    pollInterval: 1000 * 10,
  });

  if (!data) return null;
  if (loading) return <Spinner />;
  if (error) return <Text>{error.message}</Text>;

  return (
    <Flex direction="column" gap={2} p={2}>
      <Text>
        거래소 아이템: {formatDateTime(data.marketItemStats[0]?.createdAt)}
      </Text>
      <Text>
        경매장 아이템: {formatDateTime(data.auctionItemStats[0]?.createdAt)}
      </Text>
    </Flex>
  );
};
