import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";

import { SkeletonText } from "~/chakra-components/ui/skeleton";
import {
  ContentRewardListTableDocument,
  ContentRewardListTableQuery,
} from "~/core/graphql/generated";
import { Column, DataTable } from "~/core/table";

import { useContentRewardListTable } from "./content-reward-list-table-context";

export const ContentRewardListTable = () => {
  const { contentCategoryId } = useContentRewardListTable();

  const { data, error, loading } = useQuery(ContentRewardListTableDocument, {
    variables: {
      filter: {
        contentCategoryId: Number(contentCategoryId),
      },
    },
  });

  if (loading)
    return (
      <Box p={4}>
        <SkeletonText noOfLines={30} gap="4" p={4} />
      </Box>
    );
  if (error) return <>{error.message}</>;
  if (!data) throw new Error("NO DATA");

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
          ): Column<ContentRewardListTableQuery["contentList"][number]> => ({
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
  );
};
