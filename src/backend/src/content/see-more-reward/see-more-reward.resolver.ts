import { UseGuards } from "@nestjs/common";
import { Args, Float, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/common/decorator/current-user.decorator";
import { User } from "src/common/object/user.object";
import { DataLoaderService } from "src/dataloader/data-loader.service";
import { UserContentService } from "src/user/service/user-content.service";
import { Item } from "../item/item.object";
import {
  EditContentSeeMoreRewardsInput,
  EditContentSeeMoreRewardsResult,
} from "./see-more-reward.dto";
import { SeeMoreRewardService } from "./see-more-reward.service";
import { ContentSeeMoreReward } from "./see-more-reward.object";

@Resolver(() => ContentSeeMoreReward)
export class SeeMoreRewardResolver {
  constructor(
    private dataLoaderService: DataLoaderService,
    private seeMoreRewardService: SeeMoreRewardService,
    private userContentService: UserContentService
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => EditContentSeeMoreRewardsResult)
  async contentSeeMoreRewardsEdit(
    @Args("input") input: EditContentSeeMoreRewardsInput,
    @CurrentUser() user: User
  ) {
    return await this.seeMoreRewardService.editContentSeeMoreRewards(input, user.id, user.role);
  }

  @ResolveField(() => Item)
  async item(@Parent() contentSeeMoreReward: ContentSeeMoreReward) {
    return await this.dataLoaderService.item.findUniqueOrThrowById(contentSeeMoreReward.itemId);
  }

  @ResolveField(() => Float)
  async quantity(@Parent() contentSeeMoreReward: ContentSeeMoreReward) {
    return await this.userContentService.getContentSeeMoreRewardQuantity(contentSeeMoreReward.id);
  }
}
