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

  @Field(() => [ContentCreateItemsInput])
  contentRewards: ContentCreateItemsInput[];

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
export class ContentCreateItemsInput {
  @Field()
  itemId: number;

  @Field(() => Float)
  averageQuantity: number;

  @Field()
  isSellable: boolean;

  @Field()
  isExcluded: boolean;
}

@InputType()
export class ContentCreateSeeMoreRewardsInput {
  @Field()
  itemId: number;

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

    await this.prisma.content.create({
      data: {
        contentCategoryId: categoryId,
        contentDuration: {
          create: {
            value: duration,
          },
        },
        contentRewards: {
          createMany: {
            data: contentRewards
              .filter(({ isExcluded }) => !isExcluded)
              .map(({ itemId, averageQuantity, isSellable }) => ({
                itemId,
                averageQuantity,
                isSellable,
              })),
          },
        },
        contentSeeMoreRewards: {
          createMany: {
            data: contentSeeMoreRewards
              .filter(({ isExcluded }) => !isExcluded)
              .map(({ itemId, quantity }) => ({
                itemId,
                quantity,
              })),
          },
        },
        gate,
        level,
        name,
      },
    });

    return { ok: true };
  }
}
