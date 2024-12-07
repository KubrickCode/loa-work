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
    includeContentRewardItems,
  } = useContentWageListTable();
  const { data } = useSafeQuery(ContentWageListTableDocument, {
    variables: {
      filter: {
        contentCategoryId: Number(contentCategoryId),
        includeIsSeeMore: false,
        wageFilter: {
          includeIsSeeMore,
          includeIsBound,
          includeContentRewardItems,
        },
      },
    },
  });

  return (
    <DataTable
      columns={[
        {
          header: "종류",
          render({ data }) {
            return <>{data.contentCategory.name}</>;
          },
        },
        {
          header: "이름",
          render({ data }) {
            return <>{data.displayName}</>;
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
                value={data.wage.amount}
              />
            );
          },
          sortKey: "wage.amount",
        },
        {
          align: "right",
          header: "시급(골드)",
          render({ data }) {
            return <FormatGold value={data.wage.goldAmount} />;
          },
          sortKey: "wage.goldAmount",
        },
      ]}
      rows={data.contentList.map((content) => ({
        data: content,
      }))}
    />
  );
};
