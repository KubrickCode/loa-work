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

@InputType()
export class ContentCreateInput {
  @Field()
  categoryId: number;

  @Field(() => [ContentCreateRewardItemsInput])
  contentRewards: ContentCreateRewardItemsInput[];

  @Field(() => [ContentCreateSeeMoreRewardsInput], { nullable: true })
  contentSeeMoreRewards?: ContentCreateSeeMoreRewardsInput[];

  @Field()
  duration: number;

  @Field({ nullable: true })
  gate?: number | null;

  @Field()
  level: number;

  @Field()
  name: string;
}

@InputType()
export class ContentCreateRewardItemsInput {
  @Field()
  contentRewardItemId: number;

  @Field(() => Float)
  defaultAverageQuantity: number;

  @Field()
  isSellable: boolean;

  @Field()
  isExcluded: boolean;
}

@InputType()
export class ContentCreateSeeMoreRewardsInput {
  @Field()
  contentRewardItemId: number;

  @Field(() => Float)
  quantity: number;

  @Field()
  isExcluded: boolean;
}

@ObjectType()
class ContentCreateResult {
  @Field(() => Boolean)
  ok: boolean;
}

@Resolver()
export class ContentCreateMutation {
  constructor(private prisma: PrismaService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => ContentCreateResult)
  async contentCreate(@Args('input') input: ContentCreateInput) {
    const {
      categoryId,
      contentRewards,
      contentSeeMoreRewards,
      duration,
      gate,
      level,
      name,
    } = input;

    return await this.prisma.$transaction(async (tx) => {
      const content = await tx.content.create({
        data: {
          contentCategoryId: categoryId,
          contentDuration: {
            create: {
              defaultValue: duration,
            },
          },
          contentRewards: {
            createMany: {
              data: contentRewards
                .filter(({ isExcluded }) => !isExcluded)
                .map(
                  ({
                    contentRewardItemId,
                    defaultAverageQuantity,
                    isSellable,
                  }) => ({
                    contentRewardItemId,
                    defaultAverageQuantity,
                    isSellable,
                  }),
                ),
            },
          },
          contentSeeMoreRewards: {
            createMany: {
              data: contentSeeMoreRewards
                .filter(({ isExcluded }) => !isExcluded)
                .map(({ contentRewardItemId, quantity }) => ({
                  contentRewardItemId,
                  quantity,
                })),
            },
          },
          gate,
          level,
          name,
        },
        include: {
          contentDuration: true,
          contentRewards: true,
          contentSeeMoreRewards: true,
        },
      });

      const users = await tx.user.findMany();

      await Promise.all(
        users.map(async (user) => {
          await tx.userContentReward.createMany({
            data: content.contentRewards.map((reward) => ({
              contentRewardId: reward.id,
              averageQuantity: reward.defaultAverageQuantity,
              userId: user.id,
              isSellable: reward.isSellable,
            })),
          });

          await tx.userContentSeeMoreReward.createMany({
            data: content.contentSeeMoreRewards.map((reward) => ({
              contentSeeMoreRewardId: reward.id,
              quantity: reward.quantity,
              userId: user.id,
            })),
          });

          await tx.userContentDuration.create({
            data: {
              contentDurationId: content.contentDuration.id,
              value: content.contentDuration.defaultValue,
              userId: user.id,
            },
          });
        }),
      );

      return { ok: true };
    });
  }
}
