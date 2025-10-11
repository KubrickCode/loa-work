import { Float, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { ContentReward } from "./content-reward.object";
import { Item } from "./item.object";
import { UserContentService } from "../../user/service/user-content.service";
import { DataLoaderService } from "src/dataloader/data-loader.service";

@Resolver(() => ContentReward)
export class ContentRewardResolver {
  constructor(
    private userContentService: UserContentService,
    private dataLoaderService: DataLoaderService
  ) {}

  @ResolveField(() => Float)
  async averageQuantity(@Parent() contentReward: ContentReward) {
    return await this.userContentService.getContentRewardAverageQuantity(contentReward.id);
  }

  @ResolveField(() => Boolean)
  async isSellable(@Parent() contentReward: ContentReward) {
    return await this.userContentService.getContentRewardIsSellable(contentReward.id);
  }

  @ResolveField(() => Item)
  async item(@Parent() contentReward: ContentReward) {
    return await this.dataLoaderService.item.findUniqueOrThrowById(contentReward.itemId);
  }
}
