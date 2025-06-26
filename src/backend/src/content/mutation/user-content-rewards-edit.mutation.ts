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
class UserContentRewardEditInput {
  @Field()
  id: number;

  @Field(() => Float)
  averageQuantity: number;

  @Field(() => Boolean)
  isSellable: boolean;
}

@InputType()
export class UserContentRewardsEditInput {
  @Field(() => [UserContentRewardEditInput])
  userContentRewards: UserContentRewardEditInput[];

  @Field()
  isReportable: boolean;
}

@ObjectType()
class UserContentRewardsEditResult {
  @Field(() => Boolean)
  ok: boolean;
}

@Resolver()
export class UserContentRewardsEditMutation {
  constructor(
    private prisma: PrismaService,
    private userContentService: UserContentService,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => UserContentRewardsEditResult)
  async userContentRewardsEdit(
    @Args('input') input: UserContentRewardsEditInput,
    @CurrentUser() user: User,
  ) {
    await this.userContentService.validateUserContentRewards(
      input.userContentRewards.map((reward) => reward.id),
    );

    return await this.prisma.$transaction(async (tx) => {
      if (user.role === UserRole.OWNER) {
        await this.editDefaultContentRewards(input.userContentRewards, tx);
      }

      await Promise.all(
        input.userContentRewards.map(({ id, averageQuantity, isSellable }) =>
          tx.userContentReward.update({
            where: { id },
            data: { averageQuantity, isEdited: true, isSellable },
          }),
        ),
      );

      if (input.isReportable) {
        await Promise.all(
          input.userContentRewards.map(async ({ id, averageQuantity }) => {
            const userContentReward =
              await tx.userContentReward.findUniqueOrThrow({
                where: { id },
              });

            return tx.reportedContentReward.create({
              data: {
                averageQuantity,
                contentRewardId: userContentReward.contentRewardId,
                userId: user.id,
              },
            });
          }),
        );
      }

      return { ok: true };
    });
  }

  private async editDefaultContentRewards(
    userContentRewards: UserContentRewardEditInput[],
    tx: Prisma.TransactionClient,
  ) {
    await Promise.all(
      userContentRewards.map(async ({ id, averageQuantity, isSellable }) => {
        const userContentReward = await tx.userContentReward.findUniqueOrThrow({
          where: { id },
          include: {
            contentReward: true,
          },
        });

        await tx.userContentReward.updateMany({
          where: {
            contentRewardId: userContentReward.contentRewardId,
            isEdited: false,
          },
          data: {
            averageQuantity,
            isSellable,
          },
        });

        await tx.contentReward.update({
          where: {
            id: userContentReward.contentRewardId,
          },
          data: {
            defaultAverageQuantity: averageQuantity,
            isSellable,
          },
        });
      }),
    );
  }
}
