import { Flex, IconButton } from "@chakra-ui/react";
import { Suspense } from "react";
import { IoIosSettings } from "react-icons/io";

import { InfoTip } from "~/components/chakra/ui/toggle-tip";
import { Dialog } from "~/components/dialog";
import { EnhancedTableSkeleton } from "~/components/loader";
import { DataTable } from "~/components/table";
import { LoginTooltip } from "~/components/tooltip";
import { ItemNameWithImage } from "~/domains/item";
import { useAuth } from "~/libs/auth";
import { useSafeQuery } from "~/libs/graphql";
import {
  ItemKind,
  ExtraItemListTableDocument,
  ExtraItemListTableQuery,
} from "~/libs/graphql/generated";
import { FormatGold } from "~/shared/format";

import { UserExtraItemPriceEditDialog } from "./user-extra-item-price-edit-dialog";

const ExtraItemListTableContent = () => {
  const { isAuthenticated } = useAuth();
  const { data, refetch } = useSafeQuery(ExtraItemListTableDocument, {
    variables: {
      filter: {
        excludeItemName: "골드",
        kind: ItemKind.EXTRA,
      },
    },
  });

  return (
    <DataTable
      columns={[
        {
          align: "center" as const,
          header: "관리",
          render({ data }: { data: ExtraItemListTableQuery["items"][number] }) {
            return (
              <Dialog.Trigger
                dialog={UserExtraItemPriceEditDialog}
                dialogProps={{
                  itemId: data.id,
                  onComplete: refetch,
                }}
                disabled={!isAuthenticated}
              >
                <LoginTooltip content="로그인 후 골드 가치를 수정할 수 있습니다">
                  <IconButton
                    _active={{ transform: "scale(0.95)" }}
                    disabled={!isAuthenticated}
                    size={{ base: "sm", md: "xs" }}
                    variant="surface"
                  >
                    <IoIosSettings />
                  </IconButton>
                </LoginTooltip>
              </Dialog.Trigger>
            );
          },
          width: { base: "44px", md: "32px" },
        },
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
            return <FormatGold fontWeight="semibold" value={data.price} />;
          },
        },
      ]}
      rows={data.items.map((data) => ({
        data,
      }))}
    />
  );
};

export const ExtraItemListTable = () => {
  return (
    <Suspense fallback={<EnhancedTableSkeleton columnCount={3} rowCount={6} />}>
      <ExtraItemListTableContent />
    </Suspense>
  );
};
