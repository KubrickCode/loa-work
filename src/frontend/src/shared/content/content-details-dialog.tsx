import { Flex } from "@chakra-ui/react";

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

  const basicInfoItems = [
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

  const contentRewardsItems = data.content.contentRewards.map(
    (contentReward) => ({
      label: (
        <ItemNameWithImage
          name={contentReward.contentRewardItem.name}
          reverse
          src={contentReward.contentRewardItem.imageUrl}
        />
      ),
      value: contentReward.averageQuantity,
    })
  );

  return (
    <Dialog size="cover" {...dialogProps}>
      <Dialog.Content>
        <Dialog.Header>컨텐츠 상세 정보</Dialog.Header>
        <Dialog.Body>
          <Flex direction="column" gap={4}>
            <Section title="기본 정보">
              <DataGrid items={basicInfoItems} />
            </Section>
            <Section title="컨텐츠 보상">
              <DataGrid items={contentRewardsItems} />
            </Section>
          </Flex>
        </Dialog.Body>
        <Dialog.Footer />
      </Dialog.Content>
    </Dialog>
  );
};
