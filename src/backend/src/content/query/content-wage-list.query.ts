import { Args, Field, InputType, Int, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { Prisma, User } from '@prisma/client';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { ContentWageService } from '../service/content-wage.service';
import { UserContentService } from '../service/user-content.service';
import { ContentWage } from '../object/content-wage.object';

@InputType()
export class ContentWageListFilter {
  @Field(() => Int, { nullable: true })
  contentCategoryId?: number;

  @Field(() => [Int], { nullable: true })
  includeContentRewardItemIds?: number[];

  @Field(() => Boolean, { nullable: true })
  includeIsSeeMore?: boolean;

  @Field(() => Boolean, { nullable: true })
  includeIsBound?: boolean;
}

@Resolver()
export class ContentWageListQuery {
  constructor(
    private prisma: PrismaService,
    private contentWageService: ContentWageService,
    private userContentService: UserContentService,
  ) {}

  @Query(() => [ContentWage])
  async contentWageList(
    @Args('filter', { nullable: true }) filter?: ContentWageListFilter,
    @CurrentUser() user?: User,
  ) {
    const contents = await this.prisma.content.findMany({
      where: this.buildWhereArgs(filter),
      orderBy: {
        id: 'asc',
      },
    });

    const promises = contents.map(async (content) => {
      const defaultRewards = (
        await this.prisma.contentReward.findMany({
          where: {
            contentId: content.id,
            ...(filter?.includeIsBound === false && { isSellable: true }),
            ...(filter?.includeContentRewardItemIds && {
              contentRewardItemId: { in: filter.includeContentRewardItemIds },
            }),
          },
        })
      ).map(({ defaultAverageQuantity, contentRewardItemId }) => ({
        averageQuantity: defaultAverageQuantity.toNumber(),
        contentRewardItemId,
      }));

      const userRewards = (
        await this.prisma.userContentReward.findMany({
          where: {
            userId: user?.id,
            contentReward: {
              contentId: content.id,
              ...(filter?.includeIsBound === false && { isSellable: true }),
              ...(filter?.includeContentRewardItemIds && {
                contentRewardItemId: { in: filter.includeContentRewardItemIds },
              }),
            },
          },
          include: {
            contentReward: true,
          },
        })
      ).map(({ averageQuantity, contentReward }) => ({
        averageQuantity: averageQuantity.toNumber(),
        contentRewardItemId: contentReward.contentRewardItemId,
      }));

      let gold = await this.contentWageService.calculateGold(
        user ? userRewards : defaultRewards,
      );

      if (filter?.includeIsSeeMore === true && content.isSeeMore === false) {
        const seeMoreContent = await this.prisma.content.findUniqueOrThrow({
          where: {
            name_contentCategoryId_gate_isSeeMore: {
              name: content.name,
              contentCategoryId: content.contentCategoryId,
              gate: content.gate,
              isSeeMore: true,
            },
          },
        });

        const defaultSeeMoreRewards = (
          await this.prisma.contentReward.findMany({
            where: {
              contentId: seeMoreContent.id,
              ...(filter?.includeIsBound === false && { isSellable: true }),
              ...(filter?.includeContentRewardItemIds && {
                contentRewardItemId: { in: filter.includeContentRewardItemIds },
              }),
            },
          })
        ).map(({ defaultAverageQuantity, contentRewardItemId }) => ({
          averageQuantity: defaultAverageQuantity.toNumber(),
          contentRewardItemId,
        }));

        const userSeeMoreRewards = (
          await this.prisma.userContentReward.findMany({
            where: {
              userId: user?.id,
              contentReward: {
                contentId: seeMoreContent.id,
                ...(filter?.includeIsBound === false && { isSellable: true }),
                ...(filter?.includeContentRewardItemIds && {
                  contentRewardItemId: {
                    in: filter.includeContentRewardItemIds,
                  },
                }),
              },
            },
            include: {
              contentReward: true,
            },
          })
        ).map(({ averageQuantity, contentReward }) => ({
          averageQuantity: averageQuantity.toNumber(),
          contentRewardItemId: contentReward.contentRewardItemId,
        }));

        gold += await this.contentWageService.calculateGold(
          user ? userSeeMoreRewards : defaultSeeMoreRewards,
        );
      }

      const duration = await this.userContentService.getContentDuration(
        content.id,
      );

      const { krwAmount, goldAmount } =
        await this.contentWageService.calculateWage({
          gold,
          duration,
        });

      return {
        contentId: content.id,
        krwAmount,
        goldAmount,
      };
    });

    return await Promise.all(promises);
  }

  buildWhereArgs(filter?: ContentWageListFilter) {
    const where: Prisma.ContentWhereInput = {
      OR: [{ isSeeMore: false }, { isSeeMore: null }],
    };

    if (filter?.contentCategoryId) {
      where.contentCategoryId = filter.contentCategoryId;
    }

    return where;
  }
}
