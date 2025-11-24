import { UseGuards } from "@nestjs/common";
import { Args, Float, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { User as PrismaUser } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/common/decorator/current-user.decorator";
import { User } from "src/common/object/user.object";
import { DataLoaderService } from "src/dataloader/data-loader.service";
import { UserContentService } from "src/user/service/user-content.service";
import { Item } from "../item/item.object";
import {
  EditContentRewardsInput,
  EditContentRewardsResult,
  ReportContentRewardsInput,
  ReportContentRewardsResult,
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
  @Mutation(() => EditContentRewardsResult)
  async contentRewardsEdit(
    @Args("input") input: EditContentRewardsInput,
    @CurrentUser() user: User
  ) {
    return await this.rewardService.editContentRewards(input, user.id, user.role);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ReportContentRewardsResult)
  async contentRewardsReport(
    @Args("input") input: ReportContentRewardsInput,
    @CurrentUser() user: User
  ) {
    return await this.rewardService.reportContentRewards(input, user.id);
  }

  @ResolveField(() => Float)
  async averageQuantity(@Parent() contentReward: ContentReward, @CurrentUser() user?: PrismaUser) {
    return await this.userContentService.getContentRewardAverageQuantity(
      contentReward.id,
      user?.id
    );
  }

  @ResolveField(() => Boolean)
  async isSellable(@Parent() contentReward: ContentReward, @CurrentUser() user?: PrismaUser) {
    return await this.userContentService.getContentRewardIsSellable(contentReward.id, user?.id);
  }

  @ResolveField(() => Item)
  async item(@Parent() contentReward: ContentReward) {
    return await this.dataLoaderService.item.findUniqueOrThrowById(contentReward.itemId);
  }
}
