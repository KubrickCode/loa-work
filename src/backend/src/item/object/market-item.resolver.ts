import { Float, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { MarketItem } from './market-item.object';

@Resolver(() => MarketItem)
export class MarketItemResolver {
  constructor(private prisma: PrismaService) {}

  @ResolveField(() => Float)
  async currentMinPrice(@Parent() marketItem: MarketItem) {
    const { currentMinPrice } =
      await this.prisma.marketItemStat.findFirstOrThrow({
        where: {
          marketItemId: marketItem.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

    return currentMinPrice;
  }

  @ResolveField(() => Float)
  async recentPrice(@Parent() marketItem: MarketItem) {
    const { recentPrice } = await this.prisma.marketItemStat.findFirstOrThrow({
      where: {
        marketItemId: marketItem.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return recentPrice;
  }

  @ResolveField(() => Float)
  async yDayAvgPrice(@Parent() marketItem: MarketItem) {
    const { yDayAvgPrice } = await this.prisma.marketItemStat.findFirstOrThrow({
      where: {
        marketItemId: marketItem.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return yDayAvgPrice;
  }
}
