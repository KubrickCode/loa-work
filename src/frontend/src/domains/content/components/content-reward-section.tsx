import { Flex, IconButton, Text } from "@chakra-ui/react";
import { IoIosSettings } from "react-icons/io";

import { DataGrid } from "~/components/data-grid";
import { Dialog } from "~/components/dialog";
import { Section } from "~/components/section";
import { LoginTooltip } from "~/components/tooltip";
import { useAuth } from "~/libs/auth";

import { ItemNameWithImage } from "../../item";
import { ContentRewardEditDialog } from "../content-reward-edit-dialog";

type ContentRewardSectionProps = {
  contentId: number;
  contentRewards: Array<{
    averageQuantity: number | null;
    item: {
      imageUrl: string;
      name: string;
    };
  }>;
  onRefetch: () => void;
};

export const ContentRewardSection = ({
  contentId,
  contentRewards,
  onRefetch,
}: ContentRewardSectionProps) => {
  const { isAuthenticated } = useAuth();

  const items = contentRewards.map((contentReward) => ({
    label: (
      <ItemNameWithImage name={contentReward.item.name} reverse src={contentReward.item.imageUrl} />
    ),
    value: contentReward.averageQuantity || "-",
  }));

  return (
    <Section
      testId="content-reward-section"
      title={
        <Flex alignItems="center" gap={2}>
          <Text>보상 정보</Text>
          <Dialog.Trigger
            dialog={ContentRewardEditDialog}
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
