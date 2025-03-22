import { Flex } from "@chakra-ui/react";
import { Suspense, useState } from "react";
import { IoFilter } from "react-icons/io5";

import { Button } from "~/core/chakra-components/ui/button";
import { Field } from "~/core/chakra-components/ui/field";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "~/core/chakra-components/ui/popover";
import { SegmentedControl } from "~/core/chakra-components/ui/segmented-control";
import { DataGrid } from "~/core/data-grid";
import { Dialog, DialogProps } from "~/core/dialog";
import { DialogCloseButton } from "~/core/dialog/dialog-close-button";
import { useSafeQuery } from "~/core/graphql";
import {
  ContentDetailsDialogDocument,
  ContentDetailsDialogWageSectionDocument,
} from "~/core/graphql/generated";
import { TableSkeleton } from "~/core/loader";
import { Section } from "~/core/section";
import { MultiSelect } from "~/core/select";

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

  const contentSeeMoreRewardsItems = data.content.contentSeeMoreRewards.map(
    (contentSeeMoreReward) => ({
      label: (
        <ItemNameWithImage
          name={contentSeeMoreReward.contentRewardItem.name}
          reverse
          src={contentSeeMoreReward.contentRewardItem.imageUrl}
        />
      ),
      value: contentSeeMoreReward.quantity,
    })
  );

  return (
    <Dialog size="xl" {...dialogProps}>
      <Dialog.Content>
        <Dialog.Header>컨텐츠 상세 정보</Dialog.Header>
        <Dialog.Body>
          <Flex direction="column" gap={4}>
            <Section title="기본 정보">
              <DataGrid items={basicInfoItems} />
            </Section>
            <ContentWageSection
              contentId={contentId}
              contentRewardItems={data.contentRewardItems}
            />
            <Section title="보상 정보">
              <DataGrid items={contentRewardsItems} />
            </Section>
            {contentSeeMoreRewardsItems.length > 0 && (
              <Section title="더보기 보상 정보">
                <DataGrid items={contentSeeMoreRewardsItems} />
              </Section>
            )}
          </Flex>
        </Dialog.Body>
        <Dialog.Footer>
          <DialogCloseButton />
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};

const ContentWageSection = ({
  contentId,
  contentRewardItems,
}: {
  contentId: number;
  contentRewardItems: { id: number; name: string }[];
}) => {
  const [includeIsSeeMore, setIncludeIsSeeMore] = useState(false);
  const [includeIsBound, setIncludeIsBound] = useState(false);
  const [includeContentRewardItemIds, setIncludeContentRewardItemIds] =
    useState<number[]>(contentRewardItems.map(({ id }) => id));

  return (
    <Section
      title={
        <Flex alignItems="center" gap={4}>
          시급 정보{" "}
          <PopoverRoot positioning={{ placement: "right-end" }}>
            <PopoverTrigger asChild>
              <Button size="xs" variant="outline">
                <IoFilter />
                필터
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody>
                <Flex direction="column" gap={4}>
                  <Field label="컨텐츠 보상 종류" w="auto">
                    <ContentRewardItemsFilter
                      contentRewardItems={contentRewardItems}
                      includeContentRewardItemIds={includeContentRewardItemIds}
                      setIncludeContentRewardItemIds={
                        setIncludeContentRewardItemIds
                      }
                    />
                  </Field>
                  <Field label="더보기 포함 여부" w="auto">
                    <ContentSeeMoreFilter
                      includeIsSeeMore={includeIsSeeMore}
                      setIncludeIsSeeMore={setIncludeIsSeeMore}
                    />
                  </Field>
                  <Field label="귀속 재료 포함 여부" w="auto">
                    <ContentIsBoundFilter
                      includeIsBound={includeIsBound}
                      setIncludeIsBound={setIncludeIsBound}
                    />
                  </Field>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </PopoverRoot>
        </Flex>
      }
    >
      <Suspense fallback={<TableSkeleton line={1} />}>
        <ContentWageSectionDataGrid
          contentId={contentId}
          includeContentRewardItemIds={includeContentRewardItemIds}
          includeIsBound={includeIsBound}
          includeIsSeeMore={includeIsSeeMore}
        />
      </Suspense>
    </Section>
  );
};

const ContentWageSectionDataGrid = ({
  contentId,
  includeIsSeeMore,
  includeIsBound,
  includeContentRewardItemIds,
}: {
  contentId: number;
  includeIsSeeMore: boolean;
  includeIsBound: boolean;
  includeContentRewardItemIds: number[];
}) => {
  const { data } = useSafeQuery(ContentDetailsDialogWageSectionDocument, {
    variables: {
      contentId,
      filter: {
        includeIsSeeMore,
        includeIsBound,
        includeContentRewardItemIds,
      },
    },
  });

  const wageItems = [
    { label: "시급(원)", value: data.content.wage.krwAmountPerHour },
    { label: "시급(골드)", value: data.content.wage.goldAmountPerHour },
    { label: "1수당 골드", value: data.content.wage.goldAmountPerClear },
  ];

  return <DataGrid items={wageItems} />;
};

const ContentSeeMoreFilter = ({
  includeIsSeeMore,
  setIncludeIsSeeMore,
}: {
  includeIsSeeMore: boolean;
  setIncludeIsSeeMore: (value: boolean) => void;
}) => {
  return (
    <SegmentedControl
      items={[
        { label: "미포함", value: "false" },
        { label: "포함", value: "true" },
      ]}
      onValueChange={(e) => setIncludeIsSeeMore(e.value === "true")}
      value={includeIsSeeMore ? "true" : "false"}
    />
  );
};

const ContentIsBoundFilter = ({
  includeIsBound,
  setIncludeIsBound,
}: {
  includeIsBound: boolean;
  setIncludeIsBound: (value: boolean) => void;
}) => {
  return (
    <SegmentedControl
      items={[
        { label: "미포함", value: "false" },
        { label: "포함", value: "true" },
      ]}
      onValueChange={(e) => setIncludeIsBound(e.value === "true")}
      value={includeIsBound ? "true" : "false"}
    />
  );
};

const ContentRewardItemsFilter = ({
  contentRewardItems,
  includeContentRewardItemIds,
  setIncludeContentRewardItemIds,
}: {
  contentRewardItems: { id: number; name: string }[];
  includeContentRewardItemIds: number[];
  setIncludeContentRewardItemIds: (value: number[]) => void;
}) => {
  const items = contentRewardItems.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  return (
    <MultiSelect
      items={items}
      onChange={setIncludeContentRewardItemIds}
      placeholder="보상 아이템 선택"
      value={includeContentRewardItemIds}
    />
  );
};
