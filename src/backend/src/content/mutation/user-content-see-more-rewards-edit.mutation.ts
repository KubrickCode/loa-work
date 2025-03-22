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
import { UserContentService } from '../../user/service/user-content.service';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { User } from 'src/common/object/user.object';
import { Prisma, UserRole } from '@prisma/client';

@InputType()
class UserContentSeeMoreRewardEditInput {
  @Field()
  id: number;

  @Field(() => Float)
  quantity: number;
}

@InputType()
export class UserContentSeeMoreRewardsEditInput {
  @Field(() => [UserContentSeeMoreRewardEditInput])
  userContentSeeMoreRewards: UserContentSeeMoreRewardEditInput[];
}

@ObjectType()
class UserContentSeeMoreRewardsEditResult {
  @Field(() => Boolean)
  ok: boolean;
}

@Resolver()
export class UserContentSeeMoreRewardsEditMutation {
  constructor(
    private prisma: PrismaService,
    private userContentService: UserContentService,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => UserContentSeeMoreRewardsEditResult)
  async userContentSeeMoreRewardsEdit(
    @Args('input') input: UserContentSeeMoreRewardsEditInput,
    @CurrentUser() user: User,
  ) {
    await this.userContentService.validateUserContentSeeMoreRewards(
      input.userContentSeeMoreRewards.map((reward) => reward.id),
    );

    return await this.prisma.$transaction(async (tx) => {
      if (user.role === UserRole.OWNER) {
        await this.editDefaultContentRewards(
          input.userContentSeeMoreRewards,
          tx,
        );
      }

      await Promise.all(
        input.userContentSeeMoreRewards.map(({ id, quantity }) =>
          tx.userContentSeeMoreReward.update({
            where: { id },
            data: { quantity, isEdited: true },
          }),
        ),
      );

      return { ok: true };
    });
  }

  private async editDefaultContentRewards(
    userContentSeeMoreRewards: UserContentSeeMoreRewardEditInput[],
    tx: Prisma.TransactionClient,
  ) {
    await Promise.all(
      userContentSeeMoreRewards.map(async ({ id, quantity }) => {
        const userContentSeeMoreReward =
          await tx.userContentSeeMoreReward.findUniqueOrThrow({
            where: { id },
            include: {
              contentSeeMoreReward: true,
            },
          });

        await tx.userContentSeeMoreReward.updateMany({
          where: {
            contentSeeMoreRewardId:
              userContentSeeMoreReward.contentSeeMoreRewardId,
            isEdited: false,
          },
          data: {
            quantity,
          },
        });

        await tx.contentSeeMoreReward.update({
          where: {
            id: userContentSeeMoreReward.contentSeeMoreRewardId,
          },
          data: {
            quantity,
          },
        });
      }),
    );
  }
}
