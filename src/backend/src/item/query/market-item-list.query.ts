import { Args, Field, InputType, Int, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { MarketItem } from '../object/market-item.object';
import { Prisma } from '@prisma/client';

@InputType()
export class MarketItemListFilter {
  @Field({ nullable: true })
  categoryName?: string;

  @Field({ nullable: true })
  keyword?: string;

  @Field({ nullable: true })
  grade?: string;

  @Field(() => Boolean, { nullable: true })
  isStatScraperEnabled?: boolean;
}

@Resolver()
export class MarketItemListQuery {
  constructor(private prisma: PrismaService) {}

  @Query(() => [MarketItem])
  async marketItemList(
    @Args('filter', { nullable: true }) filter?: MarketItemListFilter,
  ) {
    return await this.prisma.marketItem.findMany({
      where: this.buildWhereArgs(filter),
    });
  }

  private buildWhereArgs(filter?: MarketItemListFilter) {
    const whereArgs: Prisma.MarketItemWhereInput = {};

    if (filter?.isStatScraperEnabled !== undefined) {
      whereArgs.isStatScraperEnabled = filter.isStatScraperEnabled;
    }

    if (filter?.categoryName) {
      whereArgs.marketItemCategory = {
        name: filter.categoryName,
      };
    }

    if (filter?.grade) {
      whereArgs.grade = filter.grade;
    }

    if (filter?.keyword) {
      whereArgs.OR = [
        {
          name: {
            contains: filter.keyword,
            mode: 'insensitive',
          },
        },
      ];
    }

    return whereArgs;
  }
}
