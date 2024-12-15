import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { ContentRewardItem } from './content-reward-item.object';
import { UserContentService } from 'src/user/service/user-content.service';

@Resolver(() => ContentRewardItem)
export class ContentRewardItemResolver {
  constructor(private userContentService: UserContentService) {}

  @ResolveField(() => Float)
  async price(@Parent() contentRewardItem: ContentRewardItem) {
    return await this.userContentService.getContentRewardItemPrice(
      contentRewardItem.id,
    );
  }
}
