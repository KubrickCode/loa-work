import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { Prisma } from '@prisma/client';
import { contentsWithRewards } from './data/content-revenue-data';

@Injectable()
export class SeedService {
  constructor(private prisma: PrismaService) {}

  async all() {
    await this.marketItemCategories();
    await this.auctionItemCategories();
    await this.auctionItems();
    await this.contents();
    await this.extraItems();
    await this.minimumWage();
    await this.goldExchangeRate();
  }

  async marketItemCategories() {
    await this.prisma.marketItemCategory.createMany({
      data: [
        { code: 40000, name: '각인서', isItemScraperEnabled: true },
        { code: 50010, name: '재련 재료', isItemScraperEnabled: true },
        { code: 50020, name: '재련 추가 재료', isItemScraperEnabled: true },
        { code: 51000, name: '기타 재료', isItemScraperEnabled: true },
        { code: 51100, name: '무기 진화 재료', isItemScraperEnabled: true },
      ],
    });
  }

  async auctionItemCategories() {
    await this.prisma.auctionItemCategory.createMany({
      data: [{ code: 210000, name: '보석' }],
    });
  }

  async auctionItems() {
    type Option = Pick<
      Prisma.AuctionItemUncheckedCreateInput,
      'auctionItemCategoryId' | 'name' | 'imageSrc' | 'isStatScraperEnabled'
    >;
    let damageGems: Option[] = [];
    let coolDownGems: Option[] = [];

    const auctionItemCategory =
      await this.prisma.auctionItemCategory.findFirstOrThrow({
        where: { name: '보석' },
      });

    for (let i = 1; i < 11; i++) {
      damageGems.push({
        auctionItemCategoryId: auctionItemCategory.id,
        name: `${i}레벨 겁화의 보석`,
        imageSrc: `https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_${
          95 + i
        }.png`,
        isStatScraperEnabled: true,
      });

      coolDownGems.push({
        auctionItemCategoryId: auctionItemCategory.id,
        name: `${i}레벨 작열의 보석`,
        imageSrc: `https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_${
          105 + i
        }.png`,
        isStatScraperEnabled: true,
      });
    }

    await this.prisma.auctionItem.createMany({
      data: [...damageGems, ...coolDownGems],
    });
  }

  async contents() {
    for (const contentData of contentsWithRewards) {
      const { contentRewards, ...contentFields } = contentData;

      const createdContent = await this.prisma.content.create({
        data: contentFields,
      });

      if (contentRewards && Array.isArray(contentRewards.createMany?.data)) {
        for (const reward of contentRewards.createMany.data) {
          await this.prisma.contentReward.create({
            data: {
              ...reward,
              contentId: createdContent.id,
            },
          });
        }
      }
    }
  }

  async extraItems() {
    await this.prisma.extraItem.createMany({
      data: [{ name: '실링' }],
    });
  }

  async minimumWage() {
    await this.prisma.minimumWage.create({
      data: {
        amount: 9860,
        year: 2024,
      },
    });
  }

  async goldExchangeRate() {
    await this.prisma.goldExchangeRate.create({
      data: { krwAmount: 100, goldAmount: 50 },
    });
  }
}
