import { DataGrid } from "~/core/data-grid";
import { Dialog, DialogProps } from "~/core/dialog";
import { useSafeQuery } from "~/core/graphql";
import { ContentDetailsDialogDocument } from "~/core/graphql/generated";
import { Section } from "~/core/section";

import { ItemNameWithImage } from "../item";

type ContentDetailsDialogProps = DialogProps & {
  contentId: number;
};

export const ContentDetailsDialog = ({
  contentId,
  ...dialogProps
}: ContentDetailsDialogProps) => {
  const { data } = useSafeQuery(ContentDetailsDialogDocument, {
    variables: {
      contentId,
    },
  });

  const contentData = [
    {
      label: "종류",
      value: (
        <ItemNameWithImage
          name={data.content.contentCategory.name}
          src={data.content.contentCategory.imageUrl}
        />
      ),
    },
    { label: "레벨", value: data.content.level },
    { label: "이름", value: data.content.displayName },
  ];

  return (
    <Dialog size="cover" {...dialogProps}>
      <Dialog.Content>
        <Dialog.Header>컨텐츠 상세 정보</Dialog.Header>
        <Dialog.Body>
          <Section title="기본 정보">
            <DataGrid items={contentData} />
          </Section>
        </Dialog.Body>
        <Dialog.Footer />
      </Dialog.Content>
    </Dialog>
  );
};
