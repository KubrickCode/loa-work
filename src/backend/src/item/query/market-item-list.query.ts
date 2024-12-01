import { Args, Field, InputType, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { MarketItem } from '../object/market-item.object';
import { Prisma } from '@prisma/client';

@InputType()
export class MarketItemListFilter {
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

    return whereArgs;
  }
}
