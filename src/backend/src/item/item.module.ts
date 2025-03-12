import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { MarketItemListQuery } from './query/market-item-list.query';
import { AuctionItemListQuery } from './query/auction-item-list.query';
import { MarketItemStatsQuery } from './query/market-item-stats.query';
import { AuctionItemStatsQuery } from './query/auction-item-stats.query';

@Module({
  imports: [PrismaModule],
  providers: [
    MarketItemListQuery,
    AuctionItemListQuery,
    MarketItemStatsQuery,
    AuctionItemStatsQuery,
  ],
})
export class ItemModule {}
