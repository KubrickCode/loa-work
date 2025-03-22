import { Flex, FormatNumber, IconButton, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { IoIosSettings } from "react-icons/io";

import { useAuth } from "~/core/auth";
import { InfoTip } from "~/core/chakra-components/ui/toggle-tip";
import { Dialog, useDialog } from "~/core/dialog";
import { FormatGold } from "~/core/format";
import { useSafeQuery } from "~/core/graphql";
import { ContentWageListTableDocument } from "~/core/graphql/generated";
import { DataTable } from "~/core/table";
import { useContentWageListPage } from "~/pages/content-wage-list/content-wage-list-page-context";
import { ContentDetailsDialog } from "~/shared/content";
import { ItemNameWithImage } from "~/shared/item";

import { UserContentDurationEditDialog } from "./user-content-duration-edit-dialog";

export const ContentWageListTable = ({
  setRefetchTable,
}: {
  setRefetchTable: (fn: () => void) => void;
}) => {
  const { isAuthenticated } = useAuth();
  const {
    contentCategoryId,
    keyword,
    includeIsSeeMore,
    includeIsBound,
    includeContentRewardItemIds,
  } = useContentWageListPage();
  const { data, refetch } = useSafeQuery(ContentWageListTableDocument, {
    variables: {
      filter: {
        contentCategoryId,
        keyword,
        includeIsSeeMore,
        includeIsBound,
        includeContentRewardItemIds,
      },
    },
  });
  const { onOpen, renderModal } = useDialog({
    dialog: ContentDetailsDialog,
  });

  useEffect(() => {
    setRefetchTable(() => refetch);
  }, [refetch, setRefetchTable]);

  return (
    <>
      <DataTable
        columns={[
          {
            header: "종류",
            render({ data }) {
              return (
                <ItemNameWithImage
                  name={data.content.contentCategory.name}
                  src={data.content.contentCategory.imageUrl}
                />
              );
            },
          },
          {
            header: "레벨",
            render({ data }) {
              return <>{data.content.level}</>;
            },
            sortKey: "content.level",
          },
          {
            header: "이름",
            render({ data }) {
              return <>{data.content.displayName}</>;
            },
          },
          {
            align: "right",
            header: (
              <Flex alignItems="center" gap={1}>
                소요시간
                <InfoTip content="로그인 후 수정 가능합니다" />
              </Flex>
            ),
            render({ data }) {
              return (
                <Flex alignItems="center" display="inline-flex" gap={2}>
                  <Text>{data.content.durationText}</Text>
                  <Dialog.Trigger
                    dialog={UserContentDurationEditDialog}
                    dialogProps={{
                      contentDurationId: data.content.contentDuration.id,
                      onComplete: refetch,
                    }}
                  >
                    <IconButton
                      disabled={!isAuthenticated}
                      size="2xs"
                      variant="surface"
                    >
                      <IoIosSettings />
                    </IconButton>
                  </Dialog.Trigger>
                </Flex>
              );
            },
          },
          {
            align: "right",
            header: "시급(원)",
            render({ data }) {
              return (
                <FormatNumber
                  currency="KRW"
                  style="currency"
                  value={data.krwAmountPerHour}
                />
              );
            },
            sortKey: "krwAmountPerHour",
          },
          {
            align: "right",
            header: "시급(골드)",
            render({ data }) {
              return <FormatGold value={data.goldAmountPerHour} />;
            },
            sortKey: "goldAmountPerHour",
          },
          {
            align: "right",
            header: "1수당 골드",
            render({ data }) {
              return <FormatGold value={data.goldAmountPerClear} />;
            },
            sortKey: "goldAmountPerClear",
          },
        ]}
        getRowProps={({ data }) => ({
          onClick: () => onOpen({ contentId: data.content.id }),
        })}
        rows={data.contentWageList.map((data) => ({
          data,
        }))}
      />
      {renderModal()}
    </>
  );
};
