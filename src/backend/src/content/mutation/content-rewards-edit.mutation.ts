import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/common/decorator/current-user.decorator";
import { User } from "src/common/object/user.object";
import { ContentRewardsEditInput, ContentRewardsEditResult } from "../dto";
import { ContentRewardService } from "../service/content-reward.service";

@Resolver()
export class ContentRewardsEditMutation {
  constructor(private readonly contentRewardService: ContentRewardService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => ContentRewardsEditResult, {
    description: "컨텐츠 보상 수정 (OWNER는 기본값 수정, 일반 사용자는 개인 커스텀 값 저장)",
  })
  async contentRewardsEdit(
    @Args("input") input: ContentRewardsEditInput,
    @CurrentUser() user: User
  ): Promise<ContentRewardsEditResult> {
    await this.contentRewardService.editContentRewards(
      user.id,
      user.role,
      input.contentRewards,
      input.isReportable
    );

    return { ok: true };
  }
}
