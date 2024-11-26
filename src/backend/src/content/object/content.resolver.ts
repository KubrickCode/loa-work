import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { Content } from './content.object';
import { ContentReward } from './content-reward.object';
import { ContentType } from '@prisma/client';
import { ContentRewardKind } from 'src/enums';
import { ItemPriceService } from '../service/item-price.service';

@Resolver(() => Content)
export class ContentResolver {
  constructor(
    private prisma: PrismaService,
    private itemPriceService: ItemPriceService,
  ) {}

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
          gold +=
            (await this.itemPriceService.get1LevelGemPrice()) * averageQuantity;
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
