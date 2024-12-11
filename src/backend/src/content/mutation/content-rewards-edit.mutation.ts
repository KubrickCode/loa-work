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

@InputType()
class ContentRewardEditInput {
  @Field()
  id: number;

  @Field()
  averageQuantity: number;
}

@InputType()
export class ContentRewardsEditInput {
  @Field(() => [ContentRewardEditInput])
  contentRewards: ContentRewardEditInput[];
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
  async contentRewardsEdit(@Args('input') input: ContentRewardsEditInput) {
    return await this.prisma.$transaction(async (tx) => {
      // await Promise.all(
      //   input.contentRewards.map(({ id, averageQuantity }) =>
      //     tx.contentReward.update({
      //       where: { id },
      //       data: { averageQuantity },
      //     }),
      //   ),
      // );

      return { ok: true };
    });
  }
}
