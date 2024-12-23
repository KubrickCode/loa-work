import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { AuctionItemStat } from '../object/auction-item-stat.object';
import { OrderByArg } from 'src/common/object/order-by-arg.object';

@Resolver()
export class AuctionItemStatsQuery {
  constructor(private prisma: PrismaService) {}

  @Query(() => [AuctionItemStat])
  async auctionItemStats(
    @Args('orderBy', {
      type: () => [OrderByArg],
      nullable: true,
    })
    orderBy?: OrderByArg[],
    @Args('take', { type: () => Int, nullable: true }) take: number | null = 10,
  ) {
    return await this.prisma.auctionItemStat.findMany({
      take,
      orderBy: orderBy
        ? orderBy.map((o) => ({ [o.field]: o.order }))
        : undefined,
    });
  }
}
