import {
  ContentRewardListTableDocument,
  ContentRewardListTableQuery,
} from "~/core/graphql/generated";
import { Column, DataTable } from "~/core/table";

import { useContentRewardListTable } from "./content-reward-list-table-context";
import { useSafeQuery } from "~/core/graphql";
import { ContentRewardEditDialog } from "./content-reward-edit-dialog";
import { DialogTrigger } from "~/core/dialog";
import { IconButton } from "@chakra-ui/react";
import { IoIosSettings } from "react-icons/io";

export const ContentRewardListTable = () => {
  const { contentCategoryId } = useContentRewardListTable();
  const { data } = useSafeQuery(ContentRewardListTableDocument, {
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
                dialog={<ContentRewardEditDialog contentId={data.id} />}
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
