import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { MarketItemListQuery } from './query/market-item-list.query';
import { MarketItemResolver } from './object/market-item.resolver';

@Module({
  imports: [PrismaModule],
  providers: [MarketItemListQuery, MarketItemResolver],
})
export class ItemModule {}
