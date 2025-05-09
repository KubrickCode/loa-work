import { Flex, Link, Spinner, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { ToggleTip } from "~/core/chakra-components/ui/toggle-tip";
import { formatDateTime } from "~/core/format";
import { useLazyQuery } from "~/core/graphql";
import { ItemStatUpdateToggleTipDocument } from "~/core/graphql/generated";

export const ItemStatUpdateToggleTip = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ToggleTip
      content={<Content isOpen={isOpen} />}
      onOpenChange={({ open }) => setIsOpen(open)}
    >
      <Link>아이템 시세 갱신 일시</Link>
    </ToggleTip>
  );
};

const Content = ({ isOpen }: { isOpen: boolean }) => {
  const [fetch, { data, loading, error }] = useLazyQuery(
    ItemStatUpdateToggleTipDocument,
    {
      variables: {
        take: 1,
        orderBy: [{ field: "updatedAt", order: "desc" }],
      },
    }
  );

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
          <Text>
            거래소 아이템: {formatDateTime(data.marketItems[0]?.updatedAt)}
          </Text>
          <Text>
            경매장 아이템: {formatDateTime(data.auctionItems[0]?.updatedAt)}
          </Text>
        </>
      )}
    </Flex>
  );
};
