import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { MarketItemListQuery } from './query/market-item-list.query';
import { AuctionItemListQuery } from './query/auction-item-list.query';
import { MarketItemsQuery } from './query/market-items.query';
import { AuctionItemsQuery } from './query/auction-items.query';

@Module({
  imports: [PrismaModule],
  providers: [
    MarketItemListQuery,
    AuctionItemListQuery,
    MarketItemsQuery,
    AuctionItemsQuery,
  ],
})
export class ItemModule {}
