import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { Content } from './content.object';
import { ContentReward } from './content-reward.object';
import { ContentCategory } from './content-category.object';
import * as Prisma from '@prisma/client';
import { ContentWageService } from '../service/content-wage.service';

@Resolver(() => Content)
export class ContentResolver {
  constructor(
    private prisma: PrismaService,
    private contentWageService: ContentWageService,
  ) {}

  @ResolveField(() => ContentCategory)
  async contentCategory(@Parent() content: Content) {
    return await this.prisma.contentCategory.findUniqueOrThrow({
      where: {
        id: content.contentCategoryId,
      },
    });
  }

  @ResolveField(() => [ContentReward])
  async contentRewards(@Parent() content: Content) {
    return await this.prisma.contentReward.findMany({
      where: {
        contentId: content.id,
      },
    });
  }

  @ResolveField(() => String)
  async displayName(@Parent() content: Content) {
    const { gate, isSeeMore, name } = content;
    return `${name}${gate ? ` ${gate}관문` : ''}${isSeeMore ? ' 더보기' : ''}`;
  }

  @ResolveField(() => Int)
  async wage(@Parent() content: Content) {
    const { filter } = content;

    const rewards = await this.prisma.contentReward.findMany({
      where: {
        contentId: content.id,
        ...(filter?.includeIsBound === false && { isSellable: true }),
      },
    });

    let gold = await this.contentWageService.calculateGold(rewards);

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

      const seeMoreRewards = await this.prisma.contentReward.findMany({
        where: {
          contentId: seeMoreContent.id,
          ...(filter?.includeIsBound === false && { isSellable: true }),
        },
      });

      gold += await this.contentWageService.calculateGold(seeMoreRewards);
    }

    return await this.contentWageService.calculateWage({
      gold,
      duration: content.duration,
    });
  }
}
