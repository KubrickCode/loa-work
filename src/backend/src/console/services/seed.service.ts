import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { ContentRewardItemKind, Prisma } from '@prisma/client';
import { getContentsWithRewards } from './data/content-reward-data';

@Injectable()
export class SeedService {
  constructor(private prisma: PrismaService) {}

  async all() {
    await this.users();
    await this.marketItemCategories();
    await this.marketItems();
    await this.auctionItemCategories();
    await this.auctionItems();
    await this.contentCategories();
    await this.contentRewardItems();
    await this.contents();
    await this.extraItems();
    await this.minimumWage();
    await this.goldExchangeRate();
  }

  async users() {
    await this.prisma.user.create({
      data: {
        refId: process.env.OWNER_USER_REF_ID,
        displayName: 'Owner',
        email: 'owner@lostark.com',
        provider: 'GOOGLE',
        role: 'OWNER',
      },
    });
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

  async marketItems() {
    // 재련 재료 카테고리
    const materialsCategory =
      await this.prisma.marketItemCategory.findUniqueOrThrow({
        where: { code: 50010 },
      });

    // 재련 추가 재료 카테고리
    const materialsExtraCategory =
      await this.prisma.marketItemCategory.findUniqueOrThrow({
        where: { code: 50020 },
      });

    // 운명의 파편 주머니(소), 운명의 돌파석, 운명의 파괴석, 운명의 수호석
    const materialsRefIds = [66130141, 66110225, 66102006, 66102106];
    // 용암의 숨결, 빙하의 숨결
    const materialsExtraRefIds = [66111131, 66111132];

    await this.prisma.marketItem.createMany({
      data: [
        ...materialsRefIds.map((refId) => ({
          refId,
          name: '',
          bundleCount: 0,
          imageSrc: '',
          isStatScraperEnabled: true,
          marketItemCategoryId: materialsCategory.id,
        })),
        ...materialsExtraRefIds.map((refId) => ({
          refId,
          name: '',
          bundleCount: 0,
          imageSrc: '',
          isStatScraperEnabled: true,
          marketItemCategoryId: materialsExtraCategory.id,
        })),
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
        { name: '에픽 레이드' },
        { name: '카제로스 레이드' },
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

    const { id: cubeId } = await this.prisma.contentCategory.findUniqueOrThrow({
      where: { name: '큐브' },
    });

    const { id: epicRaidId } =
      await this.prisma.contentCategory.findUniqueOrThrow({
        where: { name: '에픽 레이드' },
      });

    const { id: kazerosRaidId } =
      await this.prisma.contentCategory.findUniqueOrThrow({
        where: { name: '카제로스 레이드' },
      });

    const { id: goldId } =
      await this.prisma.contentRewardItem.findUniqueOrThrow({
        where: { name: '골드' },
      });
    const { id: sillingId } =
      await this.prisma.contentRewardItem.findUniqueOrThrow({
        where: { name: '실링' },
      });
    const { id: destinyFragmentId } =
      await this.prisma.contentRewardItem.findUniqueOrThrow({
        where: { name: '운명의 파편' },
      });
    const { id: destinyBreakstoneId } =
      await this.prisma.contentRewardItem.findUniqueOrThrow({
        where: { name: '운명의 돌파석' },
      });
    const { id: destinyDestructionId } =
      await this.prisma.contentRewardItem.findUniqueOrThrow({
        where: { name: '운명의 파괴석' },
      });
    const { id: destinyGuardianId } =
      await this.prisma.contentRewardItem.findUniqueOrThrow({
        where: { name: '운명의 수호석' },
      });
    const { id: level1GemId } =
      await this.prisma.contentRewardItem.findUniqueOrThrow({
        where: { name: '1레벨 보석' },
      });
    const { id: lavaBreathId } =
      await this.prisma.contentRewardItem.findUniqueOrThrow({
        where: { name: '용암의 숨결' },
      });
    const { id: iceBreathId } =
      await this.prisma.contentRewardItem.findUniqueOrThrow({
        where: { name: '빙하의 숨결' },
      });
    const { id: cardExpId } =
      await this.prisma.contentRewardItem.findUniqueOrThrow({
        where: { name: '카드 경험치' },
      });

    for (const contentData of getContentsWithRewards({
      kurzanId,
      guardianRaidId,
      cubeId,
      epicRaidId,
      kazerosRaidId,
      rewardItemIds: {
        goldId,
        sillingId,
        destinyFragmentId,
        destinyBreakstoneId,
        destinyDestructionId,
        destinyGuardianId,
        level1GemId,
        lavaBreathId,
        iceBreathId,
        cardExpId,
      },
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

  async contentRewardItems() {
    await this.prisma.contentRewardItem.createMany({
      data: [
        {
          name: '골드',
          defaultPrice: 1,
          kind: ContentRewardItemKind.EXTRA_ITEM,
        },
        { name: '실링', kind: ContentRewardItemKind.EXTRA_ITEM },
        {
          name: '운명의 파편',
          kind: ContentRewardItemKind.MARKET_ITEM,
        },
        {
          name: '운명의 돌파석',
          kind: ContentRewardItemKind.MARKET_ITEM,
        },
        { name: '운명의 파괴석', kind: ContentRewardItemKind.MARKET_ITEM },
        {
          name: '운명의 수호석',
          kind: ContentRewardItemKind.MARKET_ITEM,
        },
        {
          name: '1레벨 보석',
          kind: ContentRewardItemKind.AUCTION_ITEM,
        },
        {
          name: '용암의 숨결',
          kind: ContentRewardItemKind.MARKET_ITEM,
        },
        {
          name: '빙하의 숨결',
          kind: ContentRewardItemKind.MARKET_ITEM,
        },
        {
          name: '카드 경험치',
          kind: ContentRewardItemKind.EXTRA_ITEM,
        },
      ],
    });
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
