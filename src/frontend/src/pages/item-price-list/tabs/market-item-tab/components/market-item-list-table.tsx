import { Flex, Text } from "@chakra-ui/react";
import { Suspense, useState } from "react";

import { Form } from "~/core/form";
import { formatDateTime, FormatGold } from "~/core/format";
import { useSafeQuery } from "~/core/graphql";
import { MarketItemListTableDocument } from "~/core/graphql/generated";
import { EnhancedTableSkeleton } from "~/core/loader";
import { DataTable, DataTableProps } from "~/core/table";
import { ItemNameWithImage } from "~/shared/item";

type MarketItemListTableProps = {
  categoryName: string;
  defaultSorting?: DataTableProps<any>["defaultSorting"];
  grade?: string;
  pagination?: boolean;
};

const MarketItemListTableContent = ({
  categoryName,
  defaultSorting,
  grade,
  pagination = false,
}: MarketItemListTableProps) => {
  const [keyword, setKeyword] = useState("");
  const { data } = useSafeQuery(MarketItemListTableDocument, {
    fetchPolicy: "cache-and-network",
    variables: {
      filter: {
        categoryName,
        grade,
        isStatScraperEnabled: true,
        keyword,
      },
      orderBy: [{ field: "updatedAt", order: "desc" }],
      take: 1,
    },
  });

  return (
    <Flex direction="column" gap={4}>
      <Text color="text.secondary" fontSize="xs">
        마지막 업데이트 일시: {formatDateTime(data.marketItems[0]?.updatedAt)}
      </Text>
      <Form.SearchInput onSearch={setKeyword} value={keyword} />
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
            header: "판매 단위",
            render({ data }) {
              return (
                <Text color="text.primary" fontSize="md" fontWeight="medium">
                  {data.bundleCount} 개
                </Text>
              );
            },
          },
          {
            align: "right",
            header: "전일 평균 거래가",
            render({ data }) {
              return (
                <FormatGold color="text.secondary" fontWeight="medium" value={data.yDayAvgPrice} />
              );
            },
            sortKey: "yDayAvgPrice",
          },
          {
            align: "right",
            header: "최근 거래가",
            render({ data }) {
              return <FormatGold value={data.recentPrice} />;
            },
            sortKey: "recentPrice",
          },
          {
            align: "right",
            header: "최저가",
            render({ data }) {
              return <FormatGold fontWeight="bold" value={data.currentMinPrice} />;
            },
            sortKey: "currentMinPrice",
          },
        ]}
        defaultSorting={defaultSorting}
        pagination={pagination}
        rows={data.marketItemList.map((data) => ({
          data,
        }))}
      />
    </Flex>
  );
};

export const MarketItemListTable = (props: MarketItemListTableProps) => {
  return (
    <Suspense fallback={<EnhancedTableSkeleton columnCount={5} rowCount={8} />}>
      <MarketItemListTableContent {...props} />
    </Suspense>
  );
};
