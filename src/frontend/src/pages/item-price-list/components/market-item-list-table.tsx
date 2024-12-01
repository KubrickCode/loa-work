import { Flex, Image } from "@chakra-ui/react";
import { useSafeQuery } from "~/core/graphql";
import { MarketItemListDocument } from "~/core/graphql/generated";
import { DataTable } from "~/core/table";

export const MarketItemListTable = () => {
  const { data } = useSafeQuery(MarketItemListDocument);

  return (
    <DataTable
      columns={[
        {
          header: "아이템",
          render({ data }) {
            return (
              <Flex alignItems="center" gap={2}>
                <Image src={data.imageSrc} width={6} height={6} />
                {data.name}
              </Flex>
            );
          },
        },
        {
          header: "판매 단위",
          render({ data }) {
            return <>{data.bundleCount} 개</>;
          },
        },
      ]}
      rows={data.marketItemList.map((data) => ({
        data,
      }))}
    />
  );
};
