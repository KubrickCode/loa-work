import { useQuery } from "@apollo/client";

import {
  ContentRewardListPageDocument,
  ContentRewardListPageQuery,
} from "~/core/graphql/generated";
import { Page } from "~/core/page";
import { DataTable } from "~/core/table";

export const ContentRewardListPage = () => {
  const { data, error, loading } = useQuery(ContentRewardListPageDocument);

  if (loading) return <>loading...</>;
  if (error) return <>{error.message}</>;
  if (!data) return null;

  return (
    <Page>
      <DataTable
        columns={[
          {
            header: "종류",
            render({ data }) {
              return <>{data.type}</>;
            },
          },
          {
            header: "레벨",
            render({ data }) {
              return <>{data.level}</>;
            },
          },
          {
            header: "이름",
            render({ data }) {
              return <ContentName {...data} />;
            },
          },
        ]}
        rows={data.contentList.map((content) => ({
          data: content,
        }))}
      />
    </Page>
  );
};

const ContentName = ({
  gate,
  isSeeMore,
  name,
}: ContentRewardListPageQuery["contentList"][number]) => {
  return (
    <>{`${name}${gate ? ` ${gate}관문` : ""}${isSeeMore ? " 더보기" : ""}`}</>
  );
};
