import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/common/decorator/current-user.decorator";
import { User } from "src/common/object/user.object";
import { ContentRewardsReportInput, ContentRewardsReportResult } from "../dto";
import { ContentRewardService } from "../service/content-reward.service";

@Resolver()
export class ContentRewardsReportMutation {
  constructor(private readonly contentRewardService: ContentRewardService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => ContentRewardsReportResult, {
    description: "컨텐츠 보상 제보 (사용자가 실제 보상과 다름을 제보)",
  })
  async contentRewardsReport(
    @Args("input") input: ContentRewardsReportInput,
    @CurrentUser() user: User
  ): Promise<ContentRewardsReportResult> {
    await this.contentRewardService.reportContentRewards(user.id, input.contentRewards);

    return { ok: true };
  }
}
