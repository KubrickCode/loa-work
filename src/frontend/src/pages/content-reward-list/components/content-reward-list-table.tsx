import {
  ContentRewardListTableDocument,
  ContentRewardListTableQuery,
} from "~/core/graphql/generated";
import { Column, DataTable } from "~/core/table";

import { useContentRewardListTable } from "./content-reward-list-table-context";
import { useSafeQuery } from "~/core/graphql";
import { ContentRewardEditDialog } from "./content-reward-edit-dialog";
import { DialogTrigger } from "~/core/dialog";
import { FormatNumber, IconButton } from "@chakra-ui/react";
import { IoIosSettings } from "react-icons/io";
import { FormatGold } from "~/core/format";

export const ContentRewardListTable = () => {
  const { contentCategoryId } = useContentRewardListTable();
  const { data, refetch } = useSafeQuery(ContentRewardListTableDocument, {
    variables: {
      filter: {
        contentCategoryId: Number(contentCategoryId),
      },
    },
  });

  return (
    <DataTable
      columns={[
        {
          header: "",
          render({ data }) {
            return (
              <DialogTrigger
                dialog={
                  <ContentRewardEditDialog
                    contentId={data.id}
                    onComplete={refetch}
                  />
                }
                trigger={
                  <IconButton size="xs" variant="surface">
                    <IoIosSettings />
                  </IconButton>
                }
              />
            );
          },
        },
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
        {
          align: "right",
          header: "소요시간",
          render({ data }) {
            return <>{data.durationText}</>;
          },
        },
        ...data.contentRewardItems.map(
          ({
            name,
          }): Column<ContentRewardListTableQuery["contentList"][number]> => ({
            align: "right",
            header: name,
            render({ data }) {
              const reward = data.contentRewards.find(
                (reward) => reward.contentRewardItem.name === name
              );
              const isGold = reward?.contentRewardItem.name === "골드";

              return (
                <>
                  {reward ? (
                    <>
                      {isGold ? (
                        <FormatGold value={reward.averageQuantity} />
                      ) : (
                        <FormatNumber value={reward.averageQuantity} />
                      )}
                      {reward.isSellable && !isGold ? " (거래 가능)" : ""}
                    </>
                  ) : (
                    "-"
                  )}
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
