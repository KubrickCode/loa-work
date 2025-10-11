import { Float, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Item } from "./item.object";
import { ContentSeeMoreReward } from "./content-see-more-reward.object";
import { DataLoaderService } from "src/dataloader/data-loader.service";
import { UserContentService } from "src/user/service/user-content.service";

@Resolver(() => ContentSeeMoreReward)
export class ContentSeeMoreRewardResolver {
  constructor(
    private dataLoaderService: DataLoaderService,
    private userContentService: UserContentService
  ) {}

  @ResolveField(() => Item)
  async item(@Parent() contentSeeMoreReward: ContentSeeMoreReward) {
    return await this.dataLoaderService.item.findUniqueOrThrowById(contentSeeMoreReward.itemId);
  }

  @ResolveField(() => Float)
  async quantity(@Parent() contentSeeMoreReward: ContentSeeMoreReward) {
    return await this.userContentService.getContentSeeMoreRewardQuantity(contentSeeMoreReward.id);
  }
}
