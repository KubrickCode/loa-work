import { Flex, Text } from "@chakra-ui/react";
import { Suspense } from "react";

import { InfoTip } from "~/core/chakra-components/ui/toggle-tip";
import { formatDateTime, FormatGold } from "~/core/format";
import { useSafeQuery } from "~/core/graphql";
import { AuctionItemListTableDocument } from "~/core/graphql/generated";
import { EnhancedTableSkeleton } from "~/core/loader";
import { DataTable } from "~/core/table";
import { ItemNameWithImage } from "~/shared/item";

type AuctionItemListTableProps = {
  nameKeyword: string;
};

const AuctionItemListTableContent = ({ nameKeyword }: AuctionItemListTableProps) => {
  const { data } = useSafeQuery(AuctionItemListTableDocument, {
    fetchPolicy: "cache-and-network",
    variables: {
      filter: {
        isStatScraperEnabled: true,
        nameKeyword,
      },
      orderBy: [{ field: "updatedAt", order: "desc" }],
      take: 1,
    },
  });

  return (
    <Flex direction="column" gap={4}>
      <Text color="text.secondary" fontSize="xs">
        마지막 업데이트 일시: {formatDateTime(data.auctionItems[0]?.updatedAt)}
      </Text>
      <DataTable
        columns={[
          {
            header: "아이템",
            render({ data }) {
              return <ItemNameWithImage name={data.name} src={data.imageUrl} />;
            },
          },
          {
            align: "right",
            header: (
              <Flex alignItems="center" gap={1}>
                평균 즉시 구매가
                <InfoTip content="즉시 구매가 최저가순 첫 페이지 10개 항목 평균입니다" />
              </Flex>
            ),
            render({ data }) {
              return <FormatGold fontWeight="medium" value={data.avgBuyPrice} />;
            },
            sortKey: "avgBuyPrice",
          },
        ]}
        defaultSorting={{
          sortKey: "avgBuyPrice",
          value: "desc",
        }}
        rows={data.auctionItemList.map((data) => ({
          data,
        }))}
      />
    </Flex>
  );
};

export const AuctionItemListTable = (props: AuctionItemListTableProps) => {
  return (
    <Suspense fallback={<EnhancedTableSkeleton columnCount={2} rowCount={8} />}>
      <AuctionItemListTableContent {...props} />
    </Suspense>
  );
};
