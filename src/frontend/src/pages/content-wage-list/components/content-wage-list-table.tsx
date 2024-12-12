import { ContentWageListTableDocument } from "~/core/graphql/generated";
import { DataTable } from "~/core/table";
import { useContentWageListTable } from "./content-wage-list-table-context";
import { useSafeQuery } from "~/core/graphql";
import { FormatNumber } from "@chakra-ui/react";
import { FormatGold } from "~/core/format";

export const ContentWageListTable = () => {
  const {
    contentCategoryId,
    includeIsSeeMore,
    includeIsBound,
    includeContentRewardItemIds,
  } = useContentWageListTable();
  const { data } = useSafeQuery(ContentWageListTableDocument, {
    variables: {
      filter: {
        contentCategoryId,
        includeIsSeeMore,
        includeIsBound,
        includeContentRewardItemIds,
      },
    },
  });

  return (
    <DataTable
      columns={[
        {
          header: "종류",
          render({ data }) {
            return <>{data.content.contentCategory.name}</>;
          },
        },
        {
          header: "이름",
          render({ data }) {
            return <>{data.content.displayName}</>;
          },
        },
        {
          align: "right",
          header: "시급(KRW)",
          render({ data }) {
            return (
              <FormatNumber
                currency="KRW"
                style="currency"
                value={data.krwAmount}
              />
            );
          },
          sortKey: "wage.amount",
        },
        {
          align: "right",
          header: "시급(골드)",
          render({ data }) {
            return <FormatGold value={data.goldAmount} />;
          },
          sortKey: "wage.goldAmount",
        },
      ]}
      rows={data.contentWageList.map((data) => ({
        data,
      }))}
    />
  );
};
