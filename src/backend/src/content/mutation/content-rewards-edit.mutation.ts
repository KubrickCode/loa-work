import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserRole } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/common/decorator/current-user.decorator";
import { User } from "src/common/object/user.object";
import { PrismaService } from "src/prisma";
import { ContentRewardsEditInput, ContentRewardsEditResult } from "../dto";

@Resolver()
export class ContentRewardsEditMutation {
  constructor(private prisma: PrismaService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => ContentRewardsEditResult)
  async contentRewardsEdit(
    @Args("input") input: ContentRewardsEditInput,
    @CurrentUser() user: User
  ) {
    return await this.prisma.$transaction(async (tx) => {
      if (user.role === UserRole.OWNER) {
        await Promise.all(
          input.contentRewards.map(async ({ averageQuantity, contentId, isSellable, itemId }) => {
            await tx.contentReward.update({
              data: {
                averageQuantity,
                isSellable,
              },
              where: {
                contentId_itemId: {
                  contentId,
                  itemId,
                },
              },
            });
          })
        );
      }

      await Promise.all(
        input.contentRewards.map(({ averageQuantity, contentId, isSellable, itemId }) =>
          tx.userContentReward.upsert({
            create: {
              averageQuantity,
              contentId,
              isSellable,
              itemId,
              userId: user.id,
            },
            update: { averageQuantity, isSellable },
            where: {
              userId_contentId_itemId: { contentId, itemId, userId: user.id },
            },
          })
        )
      );

      if (input.isReportable) {
        await Promise.all(
          input.contentRewards.map(async ({ averageQuantity, contentId, itemId }) => {
            const contentReward = await tx.contentReward.findUniqueOrThrow({
              where: { contentId_itemId: { contentId, itemId } },
            });

            return tx.reportedContentReward.create({
              data: {
                averageQuantity,
                contentRewardId: contentReward.id,
                userId: user.id,
              },
            });
          })
        );
      }

      return { ok: true };
    });
  }
}
