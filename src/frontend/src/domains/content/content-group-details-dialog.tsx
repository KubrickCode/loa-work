import { Flex, IconButton, Text } from "@chakra-ui/react";
import { Suspense, useState } from "react";
import { IoIosSettings } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";

import { Button } from "~/components/chakra/ui/button";
import { Field } from "~/components/chakra/ui/field";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "~/components/chakra/ui/popover";
import { SegmentedControl } from "~/components/chakra/ui/segmented-control";
import { DataGrid } from "~/components/data-grid";
import { Dialog, DialogProps } from "~/components/dialog";
import { DialogCloseButton } from "~/components/dialog/dialog-close-button";
import { TextLoader } from "~/components/loader";
import { Section } from "~/components/section";
import { MultiSelect } from "~/components/select";
import { LoginTooltip } from "~/components/tooltip";
import { useAuth } from "~/libs/auth";
import { useSafeQuery } from "~/libs/graphql";
import {
  ContentDetailsDialogDocument,
  ContentDetailsDialogWageSectionDocument,
  ContentGroupDetailsDialogDocument,
  ContentGroupDetailsDialogQuery,
  ContentGroupDetailsDialogQueryVariables,
} from "~/libs/graphql/generated";

import { ItemNameWithImage } from "../item";
import { ContentDurationEditDialog } from "./content-duration-edit-dialog";
import { ContentRewardEditDialog } from "./content-reward-edit-dialog";
import { ContentSeeMoreRewardEditDialog } from "./content-see-more-reward-edit-dialog";

type ContentGroupDetailsDialogProps = {
  contentIds: number[];
  onComplete: () => void;
} & DialogProps;

export const ContentGroupDetailsDialog = ({
  contentIds,
  onClose,
  onComplete,
  open,
}: ContentGroupDetailsDialogProps) => {
  return (
    <Dialog<ContentGroupDetailsDialogQuery, ContentGroupDetailsDialogQueryVariables>
      onClose={() => {
        onClose();
        onComplete();
      }}
      open={open}
      query={ContentGroupDetailsDialogDocument}
      queryVariables={{ contentIds }}
      size="xl"
    >
      {({ queryData: data }) => (
        <>
          <Dialog.Header>컨텐츠 상세 정보</Dialog.Header>
          <Dialog.Body>
            <Flex direction="column" gap={4}>
              <Suspense fallback={<TextLoader />}>
                {data.contentGroup.contents.length > 1 ? (
                  data.contentGroup.contents.map((content) => (
                    <Section key={content.id} title={`${content.gate}관문`}>
                      <ContentGroupSection contentId={content.id} />
                    </Section>
                  ))
                ) : (
                  <ContentGroupSection contentId={data.contentGroup.contents[0].id} />
                )}
              </Suspense>
            </Flex>
          </Dialog.Body>
          <Dialog.Footer>
            <DialogCloseButton />
          </Dialog.Footer>
        </>
      )}
    </Dialog>
  );
};

const ContentGroupSection = ({ contentId }: { contentId: number }) => {
  const { data, refetch } = useSafeQuery(ContentDetailsDialogDocument, {
    variables: {
      contentId,
    },
  });
  const { isAuthenticated } = useAuth();

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

  const contentRewardsItems = data.content.contentRewards.map((contentReward) => ({
    label: (
      <ItemNameWithImage name={contentReward.item.name} reverse src={contentReward.item.imageUrl} />
    ),
    value: contentReward.averageQuantity,
  }));

  const contentSeeMoreRewardsItems = data.content.contentSeeMoreRewards.map(
    (contentSeeMoreReward) => ({
      label: (
        <ItemNameWithImage
          name={contentSeeMoreReward.item.name}
          reverse
          src={contentSeeMoreReward.item.imageUrl}
        />
      ),
      value: contentSeeMoreReward.quantity,
    })
  );

  return (
    <Flex direction="column" gap={4}>
      <Section title="기본 정보">
        <DataGrid items={basicInfoItems} />
      </Section>
      <ContentWageSection contentId={contentId} items={data.items} />
      <Section
        title={
          <Flex alignItems="center" gap={2}>
            <Text>보상 정보</Text>
            <Dialog.Trigger
              dialog={ContentRewardEditDialog}
              dialogProps={{
                contentId,
                onComplete: refetch,
              }}
              disabled={!isAuthenticated}
            >
              <LoginTooltip content="로그인 후 보상을 수정할 수 있습니다">
                <IconButton disabled={!isAuthenticated} size="2xs" variant="surface">
                  <IoIosSettings />
                </IconButton>
              </LoginTooltip>
            </Dialog.Trigger>
          </Flex>
        }
      >
        <DataGrid items={contentRewardsItems} />
      </Section>
      {contentSeeMoreRewardsItems.length > 0 && (
        <Section
          title={
            <Flex alignItems="center" gap={2}>
              <Text>더보기 보상 정보</Text>
              <Dialog.Trigger
                dialog={ContentSeeMoreRewardEditDialog}
                dialogProps={{
                  contentId,
                  onComplete: refetch,
                }}
                disabled={!isAuthenticated}
              >
                <LoginTooltip content="로그인 후 보상을 수정할 수 있습니다">
                  <IconButton disabled={!isAuthenticated} size="2xs" variant="surface">
                    <IoIosSettings />
                  </IconButton>
                </LoginTooltip>
              </Dialog.Trigger>
            </Flex>
          }
        >
          <DataGrid items={contentSeeMoreRewardsItems} />
        </Section>
      )}
    </Flex>
  );
};

const ContentWageSection = ({
  contentId,
  items,
}: {
  contentId: number;
  items: { id: number; name: string }[];
}) => {
  const [includeSeeMore, setIncludeSeeMore] = useState(false);
  const [includeBound, setIncludeBound] = useState(false);
  const [includeItemIds, setIncludeItemIds] = useState<number[]>(items.map(({ id }) => id));

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
            <PopoverContent portalled={false}>
              <PopoverArrow />
              <PopoverBody>
                <Flex direction="column" gap={4}>
                  <Field label="컨텐츠 보상 종류" w="auto">
                    <ItemsFilter
                      includeItemIds={includeItemIds}
                      items={items}
                      setIncludeItemIds={setIncludeItemIds}
                    />
                  </Field>
                  <Field label="더보기 포함 여부" w="auto">
                    <ContentSeeMoreFilter
                      includeSeeMore={includeSeeMore}
                      setIncludeSeeMore={setIncludeSeeMore}
                    />
                  </Field>
                  <Field label="귀속 재료 포함 여부" w="auto">
                    <ContentIsBoundFilter
                      includeBound={includeBound}
                      setIncludeBound={setIncludeBound}
                    />
                  </Field>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </PopoverRoot>
        </Flex>
      }
    >
      <Suspense fallback={<TextLoader />}>
        <ContentWageSectionDataGrid
          contentId={contentId}
          includeBound={includeBound}
          includeItemIds={includeItemIds}
          includeSeeMore={includeSeeMore}
        />
      </Suspense>
    </Section>
  );
};

const ContentWageSectionDataGrid = ({
  contentId,
  includeBound,
  includeItemIds,
  includeSeeMore,
}: {
  contentId: number;
  includeBound: boolean;
  includeItemIds: number[];
  includeSeeMore: boolean;
}) => {
  const { isAuthenticated } = useAuth();
  const { data, refetch } = useSafeQuery(ContentDetailsDialogWageSectionDocument, {
    variables: {
      contentId,
      filter: {
        includeBound,
        includeItemIds,
        includeSeeMore,
      },
    },
  });

  const wageItems = [
    {
      label: "소요 시간",
      value: (
        <Flex alignItems="center" gap={2}>
          <Text>{data.content.durationText}</Text>
          <Dialog.Trigger
            dialog={ContentDurationEditDialog}
            dialogProps={{
              contentId,
              onComplete: refetch,
            }}
            disabled={!isAuthenticated}
          >
            <LoginTooltip>
              <IconButton
                disabled={!isAuthenticated}
                h={4}
                minW={4}
                p={0}
                size="2xs"
                variant="ghost"
              >
                <LuPencilLine />
              </IconButton>
            </LoginTooltip>
          </Dialog.Trigger>
        </Flex>
      ),
    },
    { label: "시급(원)", value: data.content.wage.krwAmountPerHour },
    { label: "시급(골드)", value: data.content.wage.goldAmountPerHour },
    { label: "1수당 골드", value: data.content.wage.goldAmountPerClear },
  ];

  return <DataGrid items={wageItems} />;
};

const ContentSeeMoreFilter = ({
  includeSeeMore,
  setIncludeSeeMore,
}: {
  includeSeeMore: boolean;
  setIncludeSeeMore: (value: boolean) => void;
}) => {
  return (
    <SegmentedControl
      items={[
        { label: "미포함", value: "false" },
        { label: "포함", value: "true" },
      ]}
      onValueChange={(e) => setIncludeSeeMore(e.value === "true")}
      value={includeSeeMore ? "true" : "false"}
    />
  );
};

const ContentIsBoundFilter = ({
  includeBound,
  setIncludeBound,
}: {
  includeBound: boolean;
  setIncludeBound: (value: boolean) => void;
}) => {
  return (
    <SegmentedControl
      items={[
        { label: "미포함", value: "false" },
        { label: "포함", value: "true" },
      ]}
      onValueChange={(e) => setIncludeBound(e.value === "true")}
      value={includeBound ? "true" : "false"}
    />
  );
};

const ItemsFilter = ({
  includeItemIds,
  items: rewardItems,
  setIncludeItemIds,
}: {
  includeItemIds: number[];
  items: { id: number; name: string }[];
  setIncludeItemIds: (value: number[]) => void;
}) => {
  const items = rewardItems.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  return (
    <MultiSelect
      items={items}
      onChange={setIncludeItemIds}
      placeholder="보상 아이템 선택"
      value={includeItemIds}
    />
  );
};
