import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { MarketItemListQuery } from './query/market-item-list.query';
import { MarketItemResolver } from './object/market-item.resolver';
import { AuctionItemListQuery } from './query/auction-item-list.query';

@Module({
  imports: [PrismaModule],
  providers: [MarketItemListQuery, MarketItemResolver, AuctionItemListQuery],
})
export class ItemModule {}
