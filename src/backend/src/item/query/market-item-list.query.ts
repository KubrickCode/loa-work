import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { MarketItem } from '../object/market-item.object';

@Resolver()
export class MarketItemListQuery {
  constructor(private prisma: PrismaService) {}

  @Query(() => [MarketItem])
  async marketItemList() {
    return await this.prisma.marketItem.findMany();
  }
}
