import { Args, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { MarketItemStat } from '../object/market-item-stat.object';
import { OrderByArg } from 'src/common/object/order-by-arg.object';

@Resolver()
export class MarketItemStatsQuery {
  constructor(private prisma: PrismaService) {}

  @Query(() => [MarketItemStat])
  async marketItemStats(
    @Args('orderBy', {
      type: () => [OrderByArg],
      nullable: true,
    })
    orderBy?: OrderByArg[],
    @Args('take', { nullable: true }) take: number | null = 10,
  ) {
    return await this.prisma.marketItemStat.findMany({
      take,
      orderBy: orderBy
        ? orderBy.map((o) => ({ [o.field]: o.order }))
        : undefined,
    });
  }
}
