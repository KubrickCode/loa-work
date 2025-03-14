import { Flex, IconButton } from "@chakra-ui/react";
import { IoIosSettings } from "react-icons/io";

import { useAuth } from "~/core/auth";
import { InfoTip } from "~/core/chakra-components/ui/toggle-tip";
import { Dialog } from "~/core/dialog";
import { FormatGold } from "~/core/format";
import { useSafeQuery } from "~/core/graphql";
import {
  ContentRewardItemKind,
  ExtraItemListTableDocument,
  ExtraItemListTableQuery,
} from "~/core/graphql/generated";
import { DataTable } from "~/core/table";
import { ItemNameWithImage } from "~/shared/item";

import { UserExtraItemPriceEditDialog } from "./user-extra-item-price-edit-dialog";

export const ExtraItemListTable = () => {
  const { isAuthenticated } = useAuth();
  const { data, refetch } = useSafeQuery(ExtraItemListTableDocument, {
    variables: {
      filter: {
        excludeItemName: "골드",
        kind: ContentRewardItemKind.EXTRA_ITEM,
      },
    },
  });

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
                  data: ExtraItemListTableQuery["contentRewardItems"][number];
                }) {
                  return (
                    <Dialog.Trigger
                      dialog={UserExtraItemPriceEditDialog}
                      dialogProps={{
                        contentRewardItemId: data.id,
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
          header: "아이템",
          render({ data }) {
            return <ItemNameWithImage name={data.name} src={data.imageUrl} />;
          },
        },
        {
          align: "right",
          header: (
            <Flex alignItems="center" gap={1}>
              개당 골드 가치
              <InfoTip content="로그인 후 수정 가능합니다" />
            </Flex>
          ),
          render({ data }) {
            return <FormatGold value={data.price} />;
          },
        },
      ]}
      rows={data.contentRewardItems.map((data) => ({
        data,
      }))}
    />
  );
};
