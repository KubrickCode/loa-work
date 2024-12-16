import { FormatGold } from "~/core/format";
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
    },
  });

  return (
    <DataTable
      columns={[
        {
          header: "아이템",
          render({ data }) {
            return <ItemNameWithImage src={data.imageSrc} name={data.name} />;
          },
        },
        {
          align: "right",
          header: "평균 즉시 구매가",
          render({ data }) {
            return <FormatGold value={data.avgBuyPrice} />;
          },
        },
      ]}
      rows={data.auctionItemList.map((data) => ({
        data,
      }))}
    />
  );
};
