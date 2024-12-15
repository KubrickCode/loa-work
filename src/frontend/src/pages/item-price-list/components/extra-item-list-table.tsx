import { FormatGold } from "~/core/format";
import { useSafeQuery } from "~/core/graphql";
import {
  ContentRewardItemKind,
  ExtraItemListTableDocument,
} from "~/core/graphql/generated";
import { DataTable } from "~/core/table";
import { ItemNameWithImage } from "~/shared/item";

export const ExtraItemListTable = () => {
  const { data } = useSafeQuery(ExtraItemListTableDocument, {
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
        {
          header: "아이템",
          render({ data }) {
            return (
              <ItemNameWithImage
                // TODO: CDN 저장소로 이미지 이동
                src={data.name === "실링" ? "실링.png" : "카드경험치.png"}
                name={data.name}
              />
            );
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
