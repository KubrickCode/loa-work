import { UseGuards } from "@nestjs/common";
import { Args, Field, Float, InputType, Mutation, ObjectType, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "src/auth/auth.guard";
import { PrismaService } from "src/prisma";
import { CurrentUser } from "src/common/decorator/current-user.decorator";
import { User } from "src/common/object/user.object";
import { UserRole } from "@prisma/client";

@InputType()
class ContentRewardEditInput {
  @Field(() => Float)
  averageQuantity: number;

  @Field()
  contentId: number;

  @Field(() => Boolean)
  isSellable: boolean;

  @Field()
  itemId: number;
}

@InputType()
export class ContentRewardsEditInput {
  @Field(() => [ContentRewardEditInput])
  contentRewards: ContentRewardEditInput[];

  @Field()
  isReportable: boolean;
}

@ObjectType()
class ContentRewardsEditResult {
  @Field(() => Boolean)
  ok: boolean;
}

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
