import { ContentRewardListTableDocument } from "~/core/graphql/generated";
import { Column, DataTable } from "~/core/table";

import { useContentRewardListTable } from "./content-reward-list-table-context";
import { useSafeQuery } from "~/core/graphql";
import { UserContentRewardEditDialog } from "./user-content-reward-edit-dialog";
import { DialogTrigger } from "~/core/dialog";
import { FormatNumber, IconButton } from "@chakra-ui/react";
import { IoIosSettings } from "react-icons/io";
import { FormatGold } from "~/core/format";
import { useAuth } from "~/core/auth";
import { ItemNameWithImage } from "~/shared/item";

export const ContentRewardListTable = () => {
  const { isAuthenticated } = useAuth();
  const { contentCategoryId } = useContentRewardListTable();
  const { data, refetch } = useSafeQuery(ContentRewardListTableDocument, {
    variables: {
      filter: {
        contentCategoryId: Number(contentCategoryId),
      },
    },
  });

  const rows = data.contentList.flatMap((content) => [
    {
      data: {
        ...content,
        isSeeMore: false,
      },
    },
    ...(content.contentSeeMoreRewards.length > 0
      ? [
          {
            data: {
              ...content,
              isSeeMore: true,
              displayName: `${content.displayName} (더보기)`,
              contentRewards: content.contentSeeMoreRewards.map((reward) => ({
                averageQuantity: reward.quantity,
                contentRewardItem: reward.contentRewardItem,
                isSellable: false,
              })),
            },
          },
        ]
      : []),
  ]);

  return (
    <DataTable
      columns={[
        ...(isAuthenticated
          ? [
              {
                header: "",
                render({ data }: { data: (typeof rows)[number]["data"] }) {
                  return (
                    <DialogTrigger
                      dialog={
                        <UserContentRewardEditDialog
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
              } as Column<(typeof rows)[number]["data"]>,
            ]
          : []),
        {
          header: "종류",
          render({ data }) {
            return (
              <ItemNameWithImage
                src={data.contentCategory.imageUrl}
                name={data.contentCategory.name}
              />
            );
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
        ...data.contentRewardItems.map(
          ({ imageUrl, name }): Column<(typeof rows)[number]["data"]> => ({
            align: "right",
            header: <ItemNameWithImage src={imageUrl} name={name} />,
            render({ data }) {
              const reward = data.contentRewards.find(
                (reward) => reward.contentRewardItem.name === name
              );

              if (!reward) return <>-</>;

              const isGold = name === "골드";

              return (
                <>
                  {isGold ? (
                    <FormatGold value={reward.averageQuantity} />
                  ) : (
                    <FormatNumber value={reward.averageQuantity} />
                  )}
                  {reward.isSellable && !isGold ? " (거래 가능)" : ""}
                </>
              );
            },
          })
        ),
      ]}
      rows={rows}
    />
  );
};
