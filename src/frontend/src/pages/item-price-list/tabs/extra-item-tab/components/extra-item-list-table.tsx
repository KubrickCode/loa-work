import { IconButton } from "@chakra-ui/react";
import { IoIosSettings } from "react-icons/io";

import { useAuth } from "~/core/auth";
import { DialogTrigger } from "~/core/dialog";
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
                    <DialogTrigger
                      dialog={UserExtraItemPriceEditDialog}
                      dialogProps={{
                        contentRewardItemId: data.id,
                        onComplete: refetch,
                      }}
                    >
                      <IconButton size="xs" variant="surface">
                        <IoIosSettings />
                      </IconButton>
                    </DialogTrigger>
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
          header: "개당 골드 가치",
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
