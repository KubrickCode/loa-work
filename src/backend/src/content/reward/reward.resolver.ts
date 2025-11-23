import { UseGuards } from "@nestjs/common";
import { Args, Float, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/common/decorator/current-user.decorator";
import { User } from "src/common/object/user.object";
import { DataLoaderService } from "src/dataloader/data-loader.service";
import { UserContentService } from "src/user/service/user-content.service";
import { Item } from "../item/item.object";
import {
  ContentRewardsEditInput,
  ContentRewardsEditResult,
  ContentRewardsReportInput,
  ContentRewardsReportResult,
} from "./reward.dto";
import { RewardService } from "./reward.service";
import { ContentReward } from "./reward.object";

@Resolver(() => ContentReward)
export class RewardResolver {
  constructor(
    private dataLoaderService: DataLoaderService,
    private rewardService: RewardService,
    private userContentService: UserContentService
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => ContentRewardsEditResult)
  async contentRewardsEdit(
    @Args("input") input: ContentRewardsEditInput,
    @CurrentUser() user: User
  ) {
    return await this.rewardService.editContentRewards(input, user.id, user.role);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ContentRewardsReportResult)
  async contentRewardsReport(
    @Args("input") input: ContentRewardsReportInput,
    @CurrentUser() user: User
  ) {
    return await this.rewardService.reportContentRewards(input, user.id);
  }

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
