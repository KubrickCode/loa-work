import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

import { SearchInput } from "~/core/form";
import { formatDateTime, FormatGold } from "~/core/format";
import { useSafeQuery } from "~/core/graphql";
import { MarketItemListTableDocument } from "~/core/graphql/generated";
import { DataTable, DataTableProps } from "~/core/table";
import { ItemNameWithImage } from "~/shared/item";

type MarketItemListTableProps = {
  categoryName: string;
  defaultSorting?: DataTableProps<any>["defaultSorting"];
  grade?: string;
  pagination?: boolean;
};

export const MarketItemListTable = ({
  categoryName,
  defaultSorting,
  grade,
  pagination = false,
}: MarketItemListTableProps) => {
  const [keyword, setKeyword] = useState("");
  const { data } = useSafeQuery(MarketItemListTableDocument, {
    variables: {
      filter: {
        isStatScraperEnabled: true,
        categoryName,
        keyword,
        grade,
      },
      statsTake: 1,
      statsOrderBy: [{ field: "createdAt", order: "desc" }],
    },
    fetchPolicy: "cache-and-network",
  });

  return (
    <Flex direction="column" gap={2}>
      <Text fontSize="xs">
        마지막 업데이트 일시:{" "}
        {formatDateTime(data.marketItemStats[0]?.createdAt)}
      </Text>
      <SearchInput onSearch={setKeyword} value={keyword} />
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
              return <>{data.bundleCount} 개</>;
            },
          },
          {
            align: "right",
            header: "전일 평균 거래가",
            render({ data }) {
              return <FormatGold value={data.yDayAvgPrice} />;
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
              return <FormatGold value={data.currentMinPrice} />;
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
