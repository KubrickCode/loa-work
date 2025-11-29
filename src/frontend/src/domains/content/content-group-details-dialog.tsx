import { Flex, IconButton, Text } from "@chakra-ui/react";
import { Suspense } from "react";
import { IoIosSettings } from "react-icons/io";

import { DataGrid } from "~/components/data-grid";
import { Dialog, DialogProps } from "~/components/dialog";
import { DialogCloseButton } from "~/components/dialog/dialog-close-button";
import { TextLoader } from "~/components/loader";
import { Section } from "~/components/section";
import { LoginTooltip } from "~/components/tooltip";
import { useAuth } from "~/libs/auth";
import { useSafeQuery } from "~/libs/graphql";
import {
  ContentDetailsDialogDocument,
  ContentGroupDetailsDialogDocument,
  ContentGroupDetailsDialogQuery,
  ContentGroupDetailsDialogQueryVariables,
} from "~/libs/graphql/generated";

import { ItemNameWithImage } from "../item";
import { ContentWageSection } from "./components";
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
