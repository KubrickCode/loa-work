import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { SkeletonText } from "~/chakra-components/ui/skeleton";
import {
  ContentRewardListTableDocument,
  ContentRewardListTableQuery,
  ContentType,
} from "~/core/graphql/generated";
import { Column, DataTable } from "~/core/table";

type ContentRewardListTableProps = {
  contentType?: ContentType;
};

export const ContentRewardListTable = ({
  contentType,
}: ContentRewardListTableProps) => {
  const { data, error, loading } = useQuery(ContentRewardListTableDocument, {
    variables: {
      filter: { contentType },
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
