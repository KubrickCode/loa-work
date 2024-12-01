import { PrismaService } from 'src/prisma';
import { Injectable } from '@nestjs/common';
import * as Prisma from '@prisma/client';
import { ContentRewardKind } from 'src/enums';
import { ItemPriceService } from './item-price.service';
import { Content } from '../object/content.object';

@Injectable()
export class ContentWageService {
  constructor(
    private itemPriceService: ItemPriceService,
    private prisma: PrismaService,
  ) {}

  async calculateRewardsGold({
    content,
    rewards,
    includeIsSeeMore,
    excludeIsBound,
  }: {
    content: Content;
    rewards: Prisma.ContentReward[];
    includeIsSeeMore: boolean;
    excludeIsBound: boolean;
  }) {
    let gold = await this.calculateGold(rewards);

    if (includeIsSeeMore) {
      const seeMoreContent = await this.prisma.content.findUniqueOrThrow({
        where: {
          name_contentCategoryId_gate_isSeeMore: {
            name: content.name,
            contentCategoryId: content.contentCategoryId,
            gate: content.gate,
            isSeeMore: true,
          },
        },
      });

      const seeMoreRewards = await this.prisma.contentReward.findMany({
        where: {
          contentId: seeMoreContent.id,
          ...(excludeIsBound && { isSellable: true }),
        },
      });

      gold += await this.calculateGold(seeMoreRewards);
    }

    return gold;
  }

  async calculateGold(rewards: Prisma.ContentReward[]) {
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
            (await this.itemPriceService.getSmallFateFragmentBuyPricePerOne()) *
            averageQuantity;
          break;
        case ContentRewardKind.FATE_BREAKTHROUGH_STONE:
        case ContentRewardKind.FATE_DESTRUCTION_STONE:
        case ContentRewardKind.FATE_GUARDIAN_STONE:
        case ContentRewardKind.LAVA_BREATH:
        case ContentRewardKind.GLACIER_BREATH:
          gold +=
            (await this.itemPriceService.getMarketItemCurrentMinPrice(
              reward.itemName,
            )) * averageQuantity;
          break;
        case ContentRewardKind.CARD_EXP:
        case ContentRewardKind.SHILLING:
          break;
        default:
          throw new Error(`Unknown reward kind: ${reward.itemName}`);
      }
    }
    return gold;
  }

  async calculateWage({ gold, duration }: { gold: number; duration: number }) {
    const goldExchangeRate =
      await this.prisma.goldExchangeRate.findFirstOrThrow({
        take: 1,
      });

    const totalKRW =
      (gold * goldExchangeRate.goldAmount) / goldExchangeRate.krwAmount;

    const hours = duration / 3600;
    const hourlyWage = totalKRW / hours;

    return Math.round(hourlyWage);
  }
}
