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

@InputType()
class ContentRewardReportInput {
  @Field()
  id: number;

  @Field(() => Float)
  averageQuantity: number;
}

@InputType()
export class ContentRewardsReportInput {
  @Field(() => [ContentRewardReportInput])
  contentRewards: ContentRewardReportInput[];
}

@ObjectType()
class ContentRewardsReportResult {
  @Field(() => Boolean)
  ok: boolean;
}

@Resolver()
export class ContentRewardsReportMutation {
  constructor(private prisma: PrismaService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => ContentRewardsReportResult)
  async contentRewardsReport(
    @Args('input') input: ContentRewardsReportInput,
    @CurrentUser() user: User,
  ) {
    return await this.prisma.$transaction(async (tx) => {
      await Promise.all(
        input.contentRewards.map(async ({ id, averageQuantity }) => {
          return tx.reportedContentReward.create({
            data: {
              averageQuantity,
              contentRewardId: id,
              userId: user.id,
            },
          });
        }),
      );

      return { ok: true };
    });
  }
}
