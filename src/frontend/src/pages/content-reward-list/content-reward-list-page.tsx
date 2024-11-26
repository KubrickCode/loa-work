import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";

import { SkeletonText } from "~/chakra-components/ui/skeleton";
import {
  ContentRewardListPageDocument,
  ContentRewardListPageQuery,
} from "~/core/graphql/generated";
import { Page } from "~/core/page";
import { Column, DataTable } from "~/core/table";

export const ContentRewardListPage = () => {
  const { data, error, loading } = useQuery(ContentRewardListPageDocument);

  if (loading)
    return (
      <Box p={4}>
        <SkeletonText noOfLines={30} gap="4" p={4} />
      </Box>
    );
  if (error) return <>{error.message}</>;
  if (!data) throw new Error("NO DATA");

  return (
    <Page>
      <DataTable
        columns={[
          {
            header: "종류",
            render({ data }) {
              return <>{data.displayTypeName}</>;
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
              return <>{data.displayName}</>;
            },
          },
          ...data.contentRewardViewList.map(
            (
              itemName
            ): Column<ContentRewardListPageQuery["contentList"][number]> => ({
              align: "right",
              header: itemName,
              render({ data }) {
                const reward = data.contentRewards.find(
                  (reward) => reward.itemName === itemName
                );
                return (
                  <>
                    {reward
                      ? `${reward.averageQuantity}${reward.isSellable && reward.itemName !== "골드" ? " (거래 가능)" : ""}`
                      : "-"}
                  </>
                );
              },
            })
          ),
        ]}
        rows={data.contentList.map((content) => ({
          data: content,
        }))}
      />
    </Page>
  );
};
