import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { Prisma } from '@prisma/client';
import { getContentsWithRewards } from './data/content-revenue-data';

@Injectable()
export class SeedService {
  constructor(private prisma: PrismaService) {}

  async all() {
    await this.marketItemCategories();
    await this.auctionItemCategories();
    await this.auctionItems();
    await this.contentCategories();
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

  async contentCategories() {
    await this.prisma.contentCategory.createMany({
      data: [
        { name: '쿠르잔 전선' },
        { name: '가디언 토벌' },
        { name: '큐브' },
        { name: '카제로스 레이드' },
        { name: '에픽 레이드' },
      ],
    });
  }

  async contents() {
    const { id: kurzanId } =
      await this.prisma.contentCategory.findUniqueOrThrow({
        where: { name: '쿠르잔 전선' },
      });

    const { id: guardianRaidId } =
      await this.prisma.contentCategory.findUniqueOrThrow({
        where: { name: '가디언 토벌' },
      });

    const { id: epicRaidId } =
      await this.prisma.contentCategory.findUniqueOrThrow({
        where: { name: '에픽 레이드' },
      });

    const { id: cubeId } = await this.prisma.contentCategory.findUniqueOrThrow({
      where: { name: '큐브' },
    });

    const { id: kazerosRaidId } =
      await this.prisma.contentCategory.findUniqueOrThrow({
        where: { name: '카제로스 레이드' },
      });

    for (const contentData of getContentsWithRewards({
      kurzanId,
      guardianRaidId,
      epicRaidId,
      cubeId,
      kazerosRaidId,
    })) {
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
