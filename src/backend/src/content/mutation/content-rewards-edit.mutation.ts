import { UseGuards } from '@nestjs/common';
import {
  Args,
  Field,
  Float,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrismaService } from 'src/prisma';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { User } from 'src/common/object/user.object';
import { UserRole } from '@prisma/client';

@InputType()
class ContentRewardEditInput {
  @Field(() => Float)
  averageQuantity: number;

  @Field()
  contentId: number;

  @Field()
  itemId: number;

  @Field(() => Boolean)
  isSellable: boolean;
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
    @Args('input') input: ContentRewardsEditInput,
    @CurrentUser() user: User,
  ) {
    return await this.prisma.$transaction(async (tx) => {
      if (user.role === UserRole.OWNER) {
        await Promise.all(
          input.contentRewards.map(
            async ({ contentId, itemId, averageQuantity, isSellable }) => {
              await tx.contentReward.update({
                where: {
                  contentId_itemId: {
                    contentId,
                    itemId,
                  },
                },
                data: {
                  averageQuantity,
                  isSellable,
                },
              });
            },
          ),
        );
      }

      await Promise.all(
        input.contentRewards.map(
          ({ contentId, itemId, averageQuantity, isSellable }) =>
            tx.userContentReward.upsert({
              where: {
                userId_contentId_itemId: { userId: user.id, contentId, itemId },
              },
              create: {
                averageQuantity,
                isSellable,
                userId: user.id,
                contentId,
                itemId,
              },
              update: { averageQuantity, isSellable },
            }),
        ),
      );

      if (input.isReportable) {
        await Promise.all(
          input.contentRewards.map(
            async ({ contentId, itemId, averageQuantity }) => {
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
            },
          ),
        );
      }

      return { ok: true };
    });
  }
}
