import { Flex, Link, Spinner, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { ToggleTip } from "~/components/chakra/ui/toggle-tip";
import { useLazyQuery } from "~/libs/graphql";
import { ItemStatUpdateToggleTipDocument } from "~/libs/graphql/generated";
import { formatDateTime } from "~/shared/format";

export const ItemStatUpdateToggleTip = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ToggleTip content={<Content isOpen={isOpen} />} onOpenChange={({ open }) => setIsOpen(open)}>
      <Link>수집 현황</Link>
    </ToggleTip>
  );
};

const Content = ({ isOpen }: { isOpen: boolean }) => {
  const [fetch, { data, error, loading }] = useLazyQuery(ItemStatUpdateToggleTipDocument, {
    variables: {
      orderBy: [{ field: "updatedAt", order: "desc" }],
      take: 1,
    },
  });

  useEffect(() => {
    if (isOpen) fetch();
  }, [isOpen, fetch]);

  if (!data) return null;

  return (
    <Flex direction="column" gap={2} p={2}>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Text>{error.message}</Text>
      ) : (
        <>
          <Text>거래소 아이템: {formatDateTime(data.marketItems[0]?.updatedAt)}</Text>
          <Text>경매장 아이템: {formatDateTime(data.auctionItems[0]?.updatedAt)}</Text>
        </>
      )}
    </Flex>
  );
};
