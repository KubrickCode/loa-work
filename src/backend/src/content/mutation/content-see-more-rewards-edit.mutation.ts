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
class ContentSeeMoreRewardEditInput {
  @Field()
  contentId: number;

  @Field()
  itemId: number;

  @Field(() => Float)
  quantity: number;
}

@InputType()
export class ContentSeeMoreRewardsEditInput {
  @Field(() => [ContentSeeMoreRewardEditInput])
  contentSeeMoreRewards: ContentSeeMoreRewardEditInput[];
}

@ObjectType()
class ContentSeeMoreRewardsEditResult {
  @Field(() => Boolean)
  ok: boolean;
}

@Resolver()
export class ContentSeeMoreRewardsEditMutation {
  constructor(private prisma: PrismaService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => ContentSeeMoreRewardsEditResult)
  async contentSeeMoreRewardsEdit(
    @Args('input') input: ContentSeeMoreRewardsEditInput,
    @CurrentUser() user: User,
  ) {
    return await this.prisma.$transaction(async (tx) => {
      if (user.role === UserRole.OWNER) {
        await Promise.all(
          input.contentSeeMoreRewards.map(
            async ({ contentId, itemId, quantity }) => {
              await tx.contentSeeMoreReward.update({
                where: {
                  contentId_itemId: { contentId, itemId },
                },
                data: {
                  quantity,
                },
              });
            },
          ),
        );
      }

      await Promise.all(
        input.contentSeeMoreRewards.map(({ contentId, itemId, quantity }) =>
          tx.userContentSeeMoreReward.upsert({
            where: {
              userId_contentId_itemId: { userId: user.id, contentId, itemId },
            },
            create: { quantity, userId: user.id, contentId, itemId },
            update: { quantity },
          }),
        ),
      );

      return { ok: true };
    });
  }
}
