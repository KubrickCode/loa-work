import { PrismaService } from 'src/prisma';
import { Injectable } from '@nestjs/common';
import * as Prisma from '@prisma/client';
import { ContentRewardKind } from 'src/enums';
import { ItemPriceService } from './item-price.service';

@Injectable()
export class ContentWageService {
  constructor(private itemPriceService: ItemPriceService) {}

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
}
