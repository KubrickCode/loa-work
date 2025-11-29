import { Flex, IconButton, Text } from "@chakra-ui/react";
import { IoIosSettings } from "react-icons/io";

import { DataGrid } from "~/components/data-grid";
import { Dialog } from "~/components/dialog";
import { Section } from "~/components/section";
import { LoginTooltip } from "~/components/tooltip";
import { useAuth } from "~/libs/auth";

import { ItemNameWithImage } from "../../item";
import { ContentSeeMoreRewardEditDialog } from "../content-see-more-reward-edit-dialog";

type ContentSeeMoreRewardSectionProps = {
  contentId: number;
  contentSeeMoreRewards: Array<{
    item: {
      imageUrl: string;
      name: string;
    };
    quantity: number;
  }>;
  onRefetch: () => void;
};

export const ContentSeeMoreRewardSection = ({
  contentId,
  contentSeeMoreRewards,
  onRefetch,
}: ContentSeeMoreRewardSectionProps) => {
  const { isAuthenticated } = useAuth();

  const items = contentSeeMoreRewards.map((contentSeeMoreReward) => ({
    label: (
      <ItemNameWithImage
        name={contentSeeMoreReward.item.name}
        reverse
        src={contentSeeMoreReward.item.imageUrl}
      />
    ),
    value: contentSeeMoreReward.quantity,
  }));

  return (
    <Section
      title={
        <Flex alignItems="center" gap={2}>
          <Text>더보기 보상 정보</Text>
          <Dialog.Trigger
            dialog={ContentSeeMoreRewardEditDialog}
            dialogProps={{
              contentId,
              onComplete: onRefetch,
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
      <DataGrid items={items} />
    </Section>
  );
};
