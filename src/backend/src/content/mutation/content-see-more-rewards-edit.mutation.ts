import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserRole } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/common/decorator/current-user.decorator";
import { User } from "src/common/object/user.object";
import { PrismaService } from "src/prisma";
import { ContentSeeMoreRewardsEditInput, ContentSeeMoreRewardsEditResult } from "../dto";

@Resolver()
export class ContentSeeMoreRewardsEditMutation {
  constructor(private prisma: PrismaService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => ContentSeeMoreRewardsEditResult)
  async contentSeeMoreRewardsEdit(
    @Args("input") input: ContentSeeMoreRewardsEditInput,
    @CurrentUser() user: User
  ) {
    return await this.prisma.$transaction(async (tx) => {
      if (user.role === UserRole.OWNER) {
        await Promise.all(
          input.contentSeeMoreRewards.map(async ({ contentId, itemId, quantity }) => {
            await tx.contentSeeMoreReward.update({
              data: {
                quantity,
              },
              where: {
                contentId_itemId: { contentId, itemId },
              },
            });
          })
        );
      }

      await Promise.all(
        input.contentSeeMoreRewards.map(({ contentId, itemId, quantity }) =>
          tx.userContentSeeMoreReward.upsert({
            create: { contentId, itemId, quantity, userId: user.id },
            update: { quantity },
            where: {
              userId_contentId_itemId: { contentId, itemId, userId: user.id },
            },
          })
        )
      );

      return { ok: true };
    });
  }
}
