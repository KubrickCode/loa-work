import { PrismaService } from 'src/prisma';
import _ from 'lodash';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemPriceService {
  readonly ONE_LEVEL_DAMAGE_GEM_NAME = '1레벨 겁화의 보석';
  readonly ONE_LEVEL_COOL_DOWN_GEM_NAME = '1레벨 작열의 보석';
  readonly SMALL_FATE_FRAGMENT_NAME = '운명의 파편 주머니(소)';
  readonly SMALL_FATE_FRAGMENT_BUNDLE_COUNT = 1000;
  readonly RECENT_STATS_COUNT = 10;

  constructor(private prisma: PrismaService) {}

  /**
   * 1레벨 보석 가격 조회
   * 1레벨 겁화의 보석과 1레벨 작열의 보석의 각각 최근 10개의 즉시 구매가 통계를 조회하여 평균 가격을 반환
   */
  async get1LevelGemPrice() {
    // 최근 10개의 판매 통계를 조회

    const damageGem = await this.prisma.auctionItem.findFirstOrThrow({
      where: {
        name: this.ONE_LEVEL_DAMAGE_GEM_NAME,
      },
      include: {
        auctionItemStats: {
          orderBy: {
            createdAt: 'desc',
          },
          take: this.RECENT_STATS_COUNT,
        },
      },
    });

    const coolDownGem = await this.prisma.auctionItem.findFirstOrThrow({
      where: {
        name: this.ONE_LEVEL_COOL_DOWN_GEM_NAME,
      },
      include: {
        auctionItemStats: {
          orderBy: {
            createdAt: 'desc',
          },
          take: this.RECENT_STATS_COUNT,
        },
      },
    });

    const damageGemPrice = _.meanBy(damageGem.auctionItemStats, 'buyPrice');
    const coolDownGemPrice = _.meanBy(coolDownGem.auctionItemStats, 'buyPrice');

    return (damageGemPrice + coolDownGemPrice) / 2;
  }

  async getMarketItemCurrentMinPrice(itemName: string) {
    const item = await this.prisma.marketItem.findFirstOrThrow({
      where: {
        name: itemName,
      },
      include: {
        marketItemStats: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });

    return item.marketItemStats[0].currentMinPrice / item.bundleCount;
  }

  async getSmallFateFragmentBuyPricePerOne() {
    const item = await this.prisma.marketItem.findFirstOrThrow({
      where: {
        name: this.SMALL_FATE_FRAGMENT_NAME,
      },
      include: {
        marketItemStats: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });

    const currentMinPrice = item.marketItemStats[0].currentMinPrice;

    return currentMinPrice / this.SMALL_FATE_FRAGMENT_BUNDLE_COUNT;
  }
}
