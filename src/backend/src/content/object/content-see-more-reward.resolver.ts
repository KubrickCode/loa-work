import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ContentRewardItem } from './content-reward-item.object';
import { ContentSeeMoreReward } from './content-see-more-reward.object';
import { DataLoaderService } from 'src/dataloader/data-loader.service';

@Resolver(() => ContentSeeMoreReward)
export class ContentSeeMoreRewardResolver {
  constructor(private dataLoaderService: DataLoaderService) {}

  @ResolveField(() => ContentRewardItem)
  async contentRewardItem(
    @Parent() contentSeeMoreReward: ContentSeeMoreReward,
  ) {
    return await this.dataLoaderService.contentRewardItem.findUniqueOrThrowById(
      contentSeeMoreReward.contentRewardItemId,
    );
  }
}
