import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { MarketItemListQuery } from './query/market-item-list.query';

@Module({
  imports: [PrismaModule],
  providers: [MarketItemListQuery],
})
export class ItemModule {}
