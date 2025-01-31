import { Flex, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";

import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "~/chakra-components/pagination";
import { formatDateTime, FormatGold } from "~/core/format";
import { useSafeQuery } from "~/core/graphql";
import { MarketItemListTableDocument } from "~/core/graphql/generated";
import { DataTable, DataTableProps } from "~/core/table";
import { ItemNameWithImage } from "~/shared/item";

type MarketItemListTableProps = {
  categoryName: string;
  defaultSorting?: DataTableProps<any>["defaultSorting"];
  grade?: string;
};

export const MarketItemListTable = ({
  categoryName,
  defaultSorting,
  grade,
}: MarketItemListTableProps) => {
  const { data } = useSafeQuery(MarketItemListTableDocument, {
    variables: {
      filter: {
        isStatScraperEnabled: true,
        categoryName,
        grade,
      },
      statsTake: 1,
      statsOrderBy: [{ field: "createdAt", order: "desc" }],
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalItems = data.marketItemList.length;

  const currentData = data.marketItemList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Flex direction="column" gap={2}>
      <Text fontSize="xs">
        마지막 업데이트 일시:{" "}
        {formatDateTime(data.marketItemStats[0]?.createdAt)}
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
        rows={currentData.map((data) => ({
          data,
        }))}
      />
      <PaginationRoot
        count={totalItems}
        onPageChange={({ page }) => setCurrentPage(page)}
        page={currentPage}
        pageSize={pageSize}
      >
        <HStack>
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
    </Flex>
  );
};
