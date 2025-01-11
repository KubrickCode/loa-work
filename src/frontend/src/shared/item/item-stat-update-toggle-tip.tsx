import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { InfoTip } from "~/chakra-components/ui/toggle-tip";
import { formatDateTime } from "~/core/format";
import { useQuery } from "~/core/graphql";
import { ItemStatUpdateToggleTipDocument } from "~/core/graphql/generated";

export const ItemStatUpdateToggleTip = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex alignItems="center" gap={1}>
      <Text fontSize="xs">아이템 시세 갱신 일시</Text>
      <InfoTip
        onOpenChange={(details) => {
          setIsOpen(details.open);
        }}
        content={<Content isOpen={isOpen} />}
      />
    </Flex>
  );
};

const Content = ({ isOpen }: { isOpen: boolean }) => {
  const { data, loading, error, refetch } = useQuery(
    ItemStatUpdateToggleTipDocument,
    {
      variables: {
        take: 1,
        orderBy: [{ field: "createdAt", order: "desc" }],
      },
    }
  );

  useEffect(() => {
    if (isOpen) refetch();
  }, [isOpen, refetch]);

  if (loading) return <Spinner />;
  if (error) return <Text>{error.message}</Text>;
  if (!data) return null;

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
