import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { Content } from './content.object';
import { ContentReward } from './content-reward.object';
import { ContentRewardKind } from 'src/enums';
import { ItemPriceService } from '../service/item-price.service';
import { ContentCategory } from './content-category.object';

@Resolver(() => Content)
export class ContentResolver {
  constructor(
    private prisma: PrismaService,
    private itemPriceService: ItemPriceService,
  ) {}

  @ResolveField(() => ContentCategory)
  async contentCategory(@Parent() content: Content) {
    return await this.prisma.contentCategory.findUniqueOrThrow({
      where: {
        id: content.contentCategoryId,
      },
    });
  }

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

  @ResolveField(() => Int)
  async wage(@Parent() content: Content) {
    const { filter } = content;

    const rewards = await this.prisma.contentReward.findMany({
      where: {
        contentId: content.id,
        ...(filter?.includeIsBound === false && { isSellable: true }),
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

      if (filter?.includeIsSeeMore) {
        const seeMoreContents = await this.prisma.content.findMany({
          where: {
            name: content.name,
            gate: content.gate,
            isSeeMore: true,
          },
        });

        for (const seeMoreContent of seeMoreContents) {
          const seeMoreRewards = await this.prisma.contentReward.findMany({
            where: {
              contentId: seeMoreContent.id,
            },
          });

          for (const reward of seeMoreRewards) {
            const averageQuantity = reward.averageQuantity.toNumber();

            switch (reward.itemName) {
              case ContentRewardKind.GOLD:
                gold += averageQuantity;
                break;
              case ContentRewardKind.LEVEL_1_GEM:
                gold +=
                  (await this.itemPriceService.get1LevelGemPrice()) *
                  averageQuantity;
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
        }
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
}
