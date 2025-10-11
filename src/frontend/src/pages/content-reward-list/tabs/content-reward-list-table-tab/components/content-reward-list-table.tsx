import { Flex, FormatNumber, IconButton } from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

import { useAuth } from "~/core/auth";
import { Tooltip } from "~/core/chakra-components/ui/tooltip";
import { Dialog, useDialog } from "~/core/dialog";
import { FormatGold } from "~/core/format";
import { useSafeQuery } from "~/core/graphql";
import { ContentRewardListTableDocument, ContentStatus } from "~/core/graphql/generated";
import { Column, DataTable } from "~/core/table";
import { LoginTooltip } from "~/core/tooltip";
import {
  ContentDetailsDialog,
  ContentRewardEditDialog,
  ContentSeeMoreRewardEditDialog,
} from "~/shared/content";
import { ItemNameWithImage } from "~/shared/item";

import { useContentRewardListPage } from "../../../content-reward-list-page-context";

export const ContentRewardListTable = () => {
  const { isAuthenticated } = useAuth();
  const { contentCategoryId, keyword } = useContentRewardListPage();
  const { data, refetch } = useSafeQuery(ContentRewardListTableDocument, {
    variables: {
      filter: {
        contentCategoryId: Number(contentCategoryId),
        keyword,
        status: ContentStatus.ACTIVE,
      },
    },
  });
  const { onOpen, renderModal } = useDialog({
    dialog: ContentDetailsDialog,
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
              contentRewards: content.contentSeeMoreRewards.map((reward) => ({
                averageQuantity: reward.quantity,
                isSellable: false,
                item: reward.item,
              })),
              displayName: `${content.displayName} (더보기)`,
              isSeeMore: true,
            },
          },
        ]
      : []),
  ]);

  return (
    <>
      <DataTable
        columns={[
          {
            align: "center" as const,
            header: "관리",
            render({ data }: { data: (typeof rows)[number]["data"] }) {
              return (
                <Dialog.Trigger
                  dialog={data.isSeeMore ? ContentSeeMoreRewardEditDialog : ContentRewardEditDialog}
                  dialogProps={{
                    contentId: data.id,
                    onComplete: refetch,
                  }}
                  disabled={!isAuthenticated}
                >
                  <LoginTooltip content="로그인 후 보상을 수정할 수 있습니다">
                    <IconButton disabled={!isAuthenticated} size="xs" variant="surface">
                      <IoIosSettings />
                    </IconButton>
                  </LoginTooltip>
                </Dialog.Trigger>
              );
            },
            width: "32px",
          },
          {
            header: "종류",
            render({ data }) {
              return (
                <ItemNameWithImage
                  name={data.contentCategory.name}
                  src={data.contentCategory.imageUrl}
                />
              );
            },
          },
          {
            header: "레벨",
            render({ data }) {
              return <>{data.level}</>;
            },
            sortKey: "level",
          },
          {
            header: "이름",
            render({ data }) {
              return <>{data.displayName}</>;
            },
          },
          ...data.items.map(
            ({ imageUrl, name }): Column<(typeof rows)[number]["data"]> => ({
              align: "right",
              header: <ItemNameWithImage name={name} src={imageUrl} />,
              render({ data }) {
                const reward = data.contentRewards.find((reward) => reward.item.name === name);

                if (!reward || reward.averageQuantity === 0) return <>-</>;

                const isGold = name === "골드";

                return (
                  <Flex alignItems="center" display="inline-flex" gap={1}>
                    {!reward.isSellable && !isGold && (
                      <Tooltip content="거래 불가">
                        <FaLock />
                      </Tooltip>
                    )}
                    {isGold ? (
                      <FormatGold value={reward.averageQuantity} />
                    ) : (
                      <FormatNumber value={reward.averageQuantity} />
                    )}
                  </Flex>
                );
              },
              sortKey: name,
              sortValue: (data) => {
                const reward = data.contentRewards.find((reward) => reward.item.name === name);
                return reward?.averageQuantity ?? 0;
              },
            })
          ),
        ]}
        getRowProps={(row) => ({
          onClick: () => {
            onOpen({
              contentId: row.data.id,
              onComplete: refetch,
            });
          },
        })}
        rows={rows}
      />
      {renderModal()}
    </>
  );
};
