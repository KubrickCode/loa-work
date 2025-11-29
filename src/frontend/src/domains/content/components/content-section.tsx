import { Flex } from "@chakra-ui/react";

import { RewardItem } from "../types";
import { ContentBasicInfoSection } from "./content-basic-info-section";
import { ContentRewardSection } from "./content-reward-section";
import { ContentSeeMoreRewardSection } from "./content-see-more-reward-section";
import { ContentWageSection } from "./content-wage-section";

type ContentSectionProps = {
  content: {
    contentCategory: {
      imageUrl: string;
      name: string;
    };
    contentRewards: Array<{
      averageQuantity: number;
      item: {
        imageUrl: string;
        name: string;
      };
    }>;
    contentSeeMoreRewards: Array<{
      item: {
        imageUrl: string;
        name: string;
      };
      quantity: number;
    }>;
    displayName: string;
    id: number;
    level: number;
  };
  items: RewardItem[];
  onRefetch: () => void;
};

export const ContentSection = ({ content, items, onRefetch }: ContentSectionProps) => {
  return (
    <Flex direction="column" gap={4}>
      <ContentBasicInfoSection content={content} />
      <ContentWageSection contentId={content.id} items={items} />
      <ContentRewardSection
        contentId={content.id}
        contentRewards={content.contentRewards}
        onRefetch={onRefetch}
      />
      {content.contentSeeMoreRewards.length > 0 && (
        <ContentSeeMoreRewardSection
          contentId={content.id}
          contentSeeMoreRewards={content.contentSeeMoreRewards}
          onRefetch={onRefetch}
        />
      )}
    </Flex>
  );
};
