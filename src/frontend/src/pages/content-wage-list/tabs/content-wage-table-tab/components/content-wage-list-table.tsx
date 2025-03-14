import { Flex, FormatNumber, IconButton } from "@chakra-ui/react";
import { useEffect } from "react";
import { IoIosSettings } from "react-icons/io";

import { useAuth } from "~/core/auth";
import { Dialog } from "~/core/dialog";
import { FormatGold } from "~/core/format";
import { useSafeQuery } from "~/core/graphql";
import {
  ContentWageListTableDocument,
  ContentWageListTableQuery,
} from "~/core/graphql/generated";
import { DataTable } from "~/core/table";
import { InfoTooltip } from "~/core/tooltip";
import { useContentWageListPage } from "~/pages/content-wage-list/content-wage-list-page-context";
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

  useEffect(() => {
    setRefetchTable(() => refetch);
  }, [refetch, setRefetchTable]);

  return (
    <DataTable
      columns={[
        ...(isAuthenticated
          ? [
              {
                align: "center" as const,
                header: "관리",
                render({
                  data,
                }: {
                  data: ContentWageListTableQuery["contentWageList"][number];
                }) {
                  return (
                    <Dialog.Trigger
                      dialog={UserContentDurationEditDialog}
                      dialogProps={{
                        contentDurationId: data.content.contentDuration.id,
                        onComplete: refetch,
                      }}
                    >
                      <IconButton size="xs" variant="surface">
                        <IoIosSettings />
                      </IconButton>
                    </Dialog.Trigger>
                  );
                },
                width: "32px",
              },
            ]
          : []),
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
              <InfoTooltip content="로그인 후 수정 가능합니다" />
            </Flex>
          ),
          render({ data }) {
            return <>{data.content.durationText}</>;
          },
        },
        {
          align: "right",
          header: "시급(KRW)",
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
      rows={data.contentWageList.map((data) => ({
        data,
      }))}
    />
  );
};
