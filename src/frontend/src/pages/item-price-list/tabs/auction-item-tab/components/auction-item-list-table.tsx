import { Flex, Text } from "@chakra-ui/react";
import { formatDateTime, FormatGold } from "~/core/format";
import { useSafeQuery } from "~/core/graphql";
import { AuctionItemListTableDocument } from "~/core/graphql/generated";
import { DataTable } from "~/core/table";
import { ItemNameWithImage } from "~/shared/item";

type AuctionItemListTableProps = {
  nameKeyword: string;
};

export const AuctionItemListTable = ({
  nameKeyword,
}: AuctionItemListTableProps) => {
  const { data } = useSafeQuery(AuctionItemListTableDocument, {
    variables: {
      filter: {
        isStatScraperEnabled: true,
        nameKeyword,
      },
      statsTake: 1,
      statsOrderBy: [{ field: "createdAt", order: "desc" }],
    },
  });

  return (
    <Flex direction="column" gap={2}>
      <Text fontSize="xs">
        마지막 업데이트 일시:{" "}
        {formatDateTime(data.auctionItemStats[0]?.createdAt)}
      </Text>
      <DataTable
        columns={[
          {
            header: "아이템",
            render({ data }) {
              return <ItemNameWithImage src={data.imageUrl} name={data.name} />;
            },
          },
          {
            align: "right",
            header: "평균 즉시 구매가",
            render({ data }) {
              return <FormatGold value={data.avgBuyPrice} />;
            },
            sortKey: "avgBuyPrice",
          },
        ]}
        rows={data.auctionItemList.map((data) => ({
          data,
        }))}
      />
    </Flex>
  );
};
