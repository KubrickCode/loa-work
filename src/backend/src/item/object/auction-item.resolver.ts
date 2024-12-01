import { Float, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { AuctionItem } from './auction-item.object';
import { ItemPriceService } from '../service/item-price.service';
import _ from 'lodash';

@Resolver(() => AuctionItem)
export class AuctionItemResolver {
  constructor(
    private prisma: PrismaService,
    private itemPriceService: ItemPriceService,
  ) {}

  @ResolveField(() => Float)
  async avgBuyPrice(@Parent() auctionItem: AuctionItem) {
    const stats = await this.prisma.auctionItemStat.findMany({
      where: {
        auctionItemId: auctionItem.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: this.itemPriceService.RECENT_STATS_COUNT,
    });

    return _.meanBy(stats, 'buyPrice');
  }
}
