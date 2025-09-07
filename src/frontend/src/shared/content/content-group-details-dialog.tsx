import { Flex, IconButton, Text } from "@chakra-ui/react";
import { Suspense, useState } from "react";
import { IoIosSettings } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";

import { useAuth } from "~/core/auth";
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
  ContentGroupDetailsDialogDocument,
} from "~/core/graphql/generated";
import { TableSkeleton } from "~/core/loader";
import { Section } from "~/core/section";
import { MultiSelect } from "~/core/select";
import { LoginTooltip } from "~/core/tooltip";

import { ItemNameWithImage } from "../item";
import { UserContentDurationEditDialog } from "./user-content-duration-edit-dialog";
import { UserContentRewardEditDialog } from "./user-content-reward-edit-dialog";
import { UserContentSeeMoreRewardEditDialog } from "./user-content-see-more-reward-edit-dialog";

type ContentGroupDetailsDialogProps = DialogProps & {
  contentIds: number[];
  onComplete: () => void;
};

export const ContentGroupDetailsDialog = ({
  contentIds,
  onClose,
  onComplete,
  open,
}: ContentGroupDetailsDialogProps) => {
  const { data } = useSafeQuery(ContentGroupDetailsDialogDocument, {
    variables: {
      contentIds,
    },
  });

  return (
    <Dialog
      onClose={() => {
        onClose();
        onComplete();
      }}
      open={open}
      size="xl"
    >
      <Dialog.Content>
        <Dialog.Header>컨텐츠 상세 정보</Dialog.Header>
        <Dialog.Body>
          <Flex direction="column" gap={4}>
            {data.contentGroup.contents.length > 1 ? (
              data.contentGroup.contents.map((content) => (
                <Section key={content.id} title={`${content.gate}관문`}>
                  <ContentGroupSection contentId={content.id} />
                </Section>
              ))
            ) : (
              <ContentGroupSection
                contentId={data.contentGroup.contents[0].id}
              />
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

  const contentRewardsItems = data.content.contentRewards.map(
    (contentReward) => ({
      label: (
        <ItemNameWithImage
          name={contentReward.item.name}
          reverse
          src={contentReward.item.imageUrl}
        />
      ),
      value: contentReward.averageQuantity,
    })
  );

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
              dialog={UserContentRewardEditDialog}
              dialogProps={{
                contentId,
                onComplete: refetch,
              }}
              disabled={!isAuthenticated}
            >
              <LoginTooltip content="로그인 후 보상을 수정할 수 있습니다">
                <IconButton
                  disabled={!isAuthenticated}
                  size="2xs"
                  variant="surface"
                >
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
                dialog={UserContentSeeMoreRewardEditDialog}
                dialogProps={{
                  contentId,
                  onComplete: refetch,
                }}
                disabled={!isAuthenticated}
              >
                <LoginTooltip content="로그인 후 보상을 수정할 수 있습니다">
                  <IconButton
                    disabled={!isAuthenticated}
                    size="2xs"
                    variant="surface"
                  >
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
  const [includeIsSeeMore, setIncludeIsSeeMore] = useState(false);
  const [includeIsBound, setIncludeIsBound] = useState(false);
  const [includeItemIds, setIncludeItemIds] = useState<number[]>(
    items.map(({ id }) => id)
  );

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
          includeIsBound={includeIsBound}
          includeIsSeeMore={includeIsSeeMore}
          includeItemIds={includeItemIds}
        />
      </Suspense>
    </Section>
  );
};

const ContentWageSectionDataGrid = ({
  contentId,
  includeIsSeeMore,
  includeIsBound,
  includeItemIds,
}: {
  contentId: number;
  includeIsSeeMore: boolean;
  includeIsBound: boolean;
  includeItemIds: number[];
}) => {
  const { isAuthenticated } = useAuth();
  const { data, refetch } = useSafeQuery(
    ContentDetailsDialogWageSectionDocument,
    {
      variables: {
        contentId,
        filter: {
          includeIsSeeMore,
          includeIsBound,
          includeItemIds,
        },
      },
    }
  );

  const wageItems = [
    {
      label: "소요 시간",
      value: (
        <Flex alignItems="center" gap={2}>
          <Text>{data.content.durationText}</Text>
          <Dialog.Trigger
            dialog={UserContentDurationEditDialog}
            dialogProps={{
              contentDurationId: data.content.contentDuration.id,
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

const ItemsFilter = ({
  items: rewardItems,
  includeItemIds,
  setIncludeItemIds,
}: {
  items: { id: number; name: string }[];
  includeItemIds: number[];
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
