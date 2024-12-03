import { FormatGold } from "~/core/format";
import { useSafeQuery } from "~/core/graphql";
import { MarketItemListTableDocument } from "~/core/graphql/generated";
import { DataTable } from "~/core/table";
import { ItemNameWithImage } from "~/shared/item";

export const MarketItemListTable = () => {
  const { data } = useSafeQuery(MarketItemListTableDocument, {
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
        },
        {
          align: "right",
          header: "최근 거래가",
          render({ data }) {
            return <FormatGold value={data.recentPrice} />;
          },
        },
        {
          align: "right",
          header: "최저가",
          render({ data }) {
            return <FormatGold value={data.currentMinPrice} />;
          },
        },
      ]}
      rows={data.marketItemList.map((data) => ({
        data,
      }))}
    />
  );
};
