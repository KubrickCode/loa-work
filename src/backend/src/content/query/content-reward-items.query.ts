import { Args, Field, InputType, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { ContentRewardItem } from '../object/content-reward-item.object';
import { ContentRewardItemKind, Prisma } from '@prisma/client';

@InputType()
class ContentRewardItemsFilter {
  @Field({ nullable: true })
  excludeItemName?: string;

  @Field(() => ContentRewardItemKind, { nullable: true })
  kind?: ContentRewardItemKind;
}

@Resolver()
export class ContentRewardItemsQuery {
  constructor(private prisma: PrismaService) {}

  @Query(() => [ContentRewardItem])
  async contentRewardItems(
    @Args('filter', { nullable: true }) filter?: ContentRewardItemsFilter,
  ) {
    return await this.prisma.contentRewardItem.findMany({
      where: this.buildWhereArgs(filter),
      orderBy: {
        id: 'asc',
      },
    });
  }

  private buildWhereArgs(filter: ContentRewardItemsFilter) {
    const where: Prisma.ContentRewardItemWhereInput = {};

    if (filter?.kind) {
      where.kind = filter.kind;
    }

    if (filter?.excludeItemName) {
      where.name = {
        not: filter.excludeItemName,
      };
    }

    return where;
  }
}
