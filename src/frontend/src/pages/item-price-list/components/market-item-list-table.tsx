import { useSafeQuery } from "~/core/graphql";
import { MarketItemListDocument } from "~/core/graphql/generated";
import { DataTable } from "~/core/table";
import { ItemNameWithImage } from "~/shared/item";

export const MarketItemListTable = () => {
  const { data } = useSafeQuery(MarketItemListDocument, {
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
        {
          header: "판매 단위",
          render({ data }) {
            return <>{data.bundleCount} 개</>;
          },
        },
        {
          header: "최저가",
          render({ data }) {
            return <>{data.currentMinPrice}</>;
          },
        },
      ]}
      rows={data.marketItemList.map((data) => ({
        data,
      }))}
    />
  );
};
