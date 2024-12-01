import { ContentWageListTableDocument } from "~/core/graphql/generated";
import { DataTable } from "~/core/table";
import { useContentWageListTable } from "./content-wage-list-table-context";
import { useSafeQuery } from "~/core/graphql";

export const ContentWageListTable = () => {
  const { contentCategoryId, includeIsSeeMore, includeIsBound } =
    useContentWageListTable();
  const { data } = useSafeQuery(ContentWageListTableDocument, {
    variables: {
      filter: {
        contentCategoryId: Number(contentCategoryId),
        includeIsSeeMore: false,
        wageFilter: {
          includeIsSeeMore,
          includeIsBound,
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
          header: "시급",
          render({ data }) {
            return <>{data.wage}</>;
          },
          sortKey: "wage",
        },
      ]}
      rows={data.contentList.map((content) => ({
        data: content,
      }))}
    />
  );
};
