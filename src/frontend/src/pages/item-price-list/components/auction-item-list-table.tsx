import { useSafeQuery } from "~/core/graphql";
import { AuctionItemListTableDocument } from "~/core/graphql/generated";
import { DataTable } from "~/core/table";
import { ItemNameWithImage } from "~/shared/item";

export const AuctionItemListTable = () => {
  const { data } = useSafeQuery(AuctionItemListTableDocument, {
    variables: {
      filter: {
        isStatScraperEnabled: true,
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
      ]}
      rows={data.auctionItemList.map((data) => ({
        data,
      }))}
    />
  );
};
