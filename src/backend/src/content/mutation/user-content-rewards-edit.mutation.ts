import { UseGuards } from '@nestjs/common';
import {
  Args,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrismaService } from 'src/prisma';
import { UserContentService } from '../../user/service/user-content.service';

@InputType()
class UserContentRewardEditInput {
  @Field()
  id: number;

  @Field()
  averageQuantity: number;
}

@InputType()
export class UserContentRewardsEditInput {
  @Field(() => [UserContentRewardEditInput])
  userContentRewards: UserContentRewardEditInput[];
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
  ) {
    await this.userContentService.validateUserContentRewards(
      input.userContentRewards.map((reward) => reward.id),
    );

    return await this.prisma.$transaction(async (tx) => {
      await Promise.all(
        input.userContentRewards.map(({ id, averageQuantity }) =>
          tx.userContentReward.update({
            where: { id },
            data: { averageQuantity },
          }),
        ),
      );

      return { ok: true };
    });
  }
}
