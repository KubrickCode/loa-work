import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { Content } from './content.object';
import { ContentReward } from './content-reward.object';
import { ContentType } from '@prisma/client';
import { ContentRewardKind } from 'src/enums';

@Resolver(() => Content)
export class ContentResolver {
  constructor(private prisma: PrismaService) {}

  @ResolveField(() => [ContentReward])
  async contentRewards(@Parent() content: Content) {
    return await this.prisma.contentReward.findMany({
      where: {
        contentId: content.id,
      },
    });
  }

  @ResolveField(() => String)
  async displayName(@Parent() content: Content) {
    const { gate, isSeeMore, name } = content;
    return `${name}${gate ? ` ${gate}관문` : ''}${isSeeMore ? ' 더보기' : ''}`;
  }

  @ResolveField(() => String)
  async displayTypeName(@Parent() content: Content) {
    const typeNames = {
      [ContentType.CUBE]: '큐브',
      [ContentType.EPIC_RAID]: '에픽 레이드',
      [ContentType.GUARDIAN_RAID]: '가디언 토벌',
      [ContentType.KURZAN_FRONT]: '쿠르잔 전선',
      [ContentType.KAZEROS_RAID]: '카제로스 레이드',
      [ContentType.LEGION_COMMANDER_RAID]: '군단장 레이드',
    };

    return typeNames[content.type];
  }

  @ResolveField(() => Int)
  async wage(@Parent() content: Content) {
    const rewards = await this.prisma.contentReward.findMany({
      where: {
        contentId: content.id,
      },
    });

    let gold = 0;

    for (const reward of rewards) {
      const averageQuantity = reward.averageQuantity.toNumber();

      switch (reward.itemName) {
        case ContentRewardKind.GOLD:
          gold += averageQuantity;
          break;
        case ContentRewardKind.LEVEL_1_GEM:
          gold += (await this.getGemAverageBuyPrice()) * averageQuantity;
          break;
        case ContentRewardKind.FATE_FRAGMENT:
          gold +=
            (await this.getFateFragmentBuyPricePerOne()) * averageQuantity;
          break;
        case ContentRewardKind.FATE_BREAKTHROUGH_STONE:
        case ContentRewardKind.FATE_DESTRUCTION_STONE:
        case ContentRewardKind.FATE_GUARDIAN_STONE:
        case ContentRewardKind.LAVA_BREATH:
        case ContentRewardKind.GLACIER_BREATH:
          gold +=
            (await this.getMarketItemCurrentMinPrice(reward.itemName)) *
            averageQuantity;
          break;
        case ContentRewardKind.CARD_EXP:
        case ContentRewardKind.SHILLING:
          break;
        default:
          throw new Error(`Unknown reward kind: ${reward.itemName}`);
      }
    }

    const goldExchangeRate =
      await this.prisma.goldExchangeRate.findFirstOrThrow({
        take: 1,
      });

    const totalKRW =
      (gold * goldExchangeRate.goldAmount) / goldExchangeRate.krwAmount;

    const hours = content.duration / 3600;
    const hourlyWage = totalKRW / hours;

    return Math.round(hourlyWage);
  }

  private async getGemAverageBuyPrice() {
    // 최근 10개의 판매 통계를 조회
    const RECENT_STATS_COUNT = 10;

    const damageGem = await this.prisma.auctionItem.findFirstOrThrow({
      where: {
        name: '1레벨 겁화의 보석',
      },
      include: {
        auctionItemStats: {
          orderBy: {
            createdAt: 'desc',
          },
          take: RECENT_STATS_COUNT,
        },
      },
    });

    const coolDownGem = await this.prisma.auctionItem.findFirstOrThrow({
      where: {
        name: '1레벨 작열의 보석',
      },
      include: {
        auctionItemStats: {
          orderBy: {
            createdAt: 'desc',
          },
          take: RECENT_STATS_COUNT,
        },
      },
    });

    const damageGemWage =
      damageGem.auctionItemStats.reduce((acc, stat) => acc + stat.buyPrice, 0) /
      damageGem.auctionItemStats.length;
    const coolDownGemWage =
      coolDownGem.auctionItemStats.reduce(
        (acc, stat) => acc + stat.buyPrice,
        0,
      ) / coolDownGem.auctionItemStats.length;

    return (damageGemWage + coolDownGemWage) / 2;
  }

  private async getMarketItemCurrentMinPrice(itemName: string) {
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

  private async getFateFragmentBuyPricePerOne() {
    const item = await this.prisma.marketItem.findFirstOrThrow({
      where: {
        name: '운명의 파편 주머니(소)',
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

    return currentMinPrice / 1000;
  }
}
