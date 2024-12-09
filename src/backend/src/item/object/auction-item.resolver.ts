import { Float, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { AuctionItem } from './auction-item.object';
import _ from 'lodash';

@Resolver(() => AuctionItem)
export class AuctionItemResolver {
  private readonly RECENT_STATS_COUNT = 10;

  constructor(private prisma: PrismaService) {}

  @ResolveField(() => Float)
  async avgBuyPrice(@Parent() auctionItem: AuctionItem) {
    const stats = await this.prisma.auctionItemStat.findMany({
      where: {
        auctionItemId: auctionItem.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: this.RECENT_STATS_COUNT,
    });

    return _.meanBy(stats, 'buyPrice');
  }
}
