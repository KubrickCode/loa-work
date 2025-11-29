import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { ItemKind } from "@prisma/client";
import { auctionItemData } from "./data/auction-item-data";
import { auctionItemStatData } from "./data/auction-item-stat-data";
import { getContentsWithRewards } from "./data/content-reward-data";
import { getMarketItemCategoryCode, marketItemData } from "./data/market-item-data";
import { marketItemStatData } from "./data/market-item-stat-data";

@Injectable()
export class SeedService {
  constructor(private prisma: PrismaService) {}

  async all() {
    await this.users();
    await this.marketItemCategories();
    await this.marketItems();
    await this.marketItemStats();
    await this.auctionItemCategories();
    await this.auctionItems();
    await this.auctionItemStats();
    await this.contentCategories();
    await this.items();
    await this.contents();
    await this.goldExchangeRate();
  }

  async auctionItemCategories() {
    await this.prisma.auctionItemCategory.createMany({
      data: [{ code: 210000, name: "보석" }],
    });
  }

  async auctionItems() {
    const auctionItemCategory = await this.prisma.auctionItemCategory.findFirstOrThrow({
      where: { name: "보석" },
    });

    await this.prisma.auctionItem.createMany({
      data: auctionItemData.map((item) => ({
        ...item,
        auctionItemCategoryId: auctionItemCategory.id,
      })),
    });
  }

  async auctionItemStats() {
    await this.prisma.auctionItemStat.createMany({
      data: auctionItemStatData.map((stat) => ({
        ...stat,
        endDate: new Date(stat.endDate),
      })),
    });
  }

  async contentCategories() {
    await this.prisma.contentCategory.createMany({
      data: [
        {
          imageUrl:
            "https://res.cloudinary.com/dn74c0eep/image/upload/v1734429566/ripkqgpxfye68kmwqubc.png",
          name: "쿠르잔 전선",
        },
        {
          imageUrl:
            "https://res.cloudinary.com/dn74c0eep/image/upload/v1734429566/gjzcmvr5adsfq14aijxo.png",
          name: "가디언 토벌",
        },
        {
          imageUrl:
            "https://res.cloudinary.com/dn74c0eep/image/upload/v1734429566/jgul02aesc3bu56cslya.png",
          name: "에포나 의뢰",
        },
        {
          imageUrl:
            "https://res.cloudinary.com/dn74c0eep/image/upload/v1734429566/kdywiiwqluqbir4px6es.png",
          name: "큐브",
        },
        {
          imageUrl:
            "https://res.cloudinary.com/dn74c0eep/image/upload/v1734429565/b5nlz8pru2y6ubnz5ucq.png",
          name: "카오스게이트",
        },
        {
          imageUrl:
            "https://res.cloudinary.com/dn74c0eep/image/upload/v1734429566/sl4etdgkwejmttukaoth.png",
          name: "필드보스",
        },
        {
          imageUrl:
            "https://res.cloudinary.com/dn74c0eep/image/upload/v1734429566/yvlcbzxtiffii2ehgsw7.png",
          name: "에픽 레이드",
        },
        {
          imageUrl:
            "https://res.cloudinary.com/dn74c0eep/image/upload/v1734429566/z4divlldywzqrvi6pjwg.png",
          name: "카제로스 레이드",
        },
      ],
    });
  }

  async contents() {
    const { id: kurzanId } = await this.prisma.contentCategory.findUniqueOrThrow({
      where: { name: "쿠르잔 전선" },
    });

    const { id: guardianRaidId } = await this.prisma.contentCategory.findUniqueOrThrow({
      where: { name: "가디언 토벌" },
    });

    const { id: eponaQuestId } = await this.prisma.contentCategory.findUniqueOrThrow({
      where: { name: "에포나 의뢰" },
    });

    const { id: cubeId } = await this.prisma.contentCategory.findUniqueOrThrow({
      where: { name: "큐브" },
    });

    const { id: chaosGateId } = await this.prisma.contentCategory.findUniqueOrThrow({
      where: { name: "카오스게이트" },
    });

    const { id: fieldBossId } = await this.prisma.contentCategory.findUniqueOrThrow({
      where: { name: "필드보스" },
    });

    const { id: epicRaidId } = await this.prisma.contentCategory.findUniqueOrThrow({
      where: { name: "에픽 레이드" },
    });

    const { id: kazerosRaidId } = await this.prisma.contentCategory.findUniqueOrThrow({
      where: { name: "카제로스 레이드" },
    });

    const { id: goldId } = await this.prisma.item.findUniqueOrThrow({
      where: { name: "골드" },
    });
    const { id: sillingId } = await this.prisma.item.findUniqueOrThrow({
      where: { name: "실링" },
    });
    const { id: destinyFragmentId } = await this.prisma.item.findUniqueOrThrow({
      where: { name: "운명의 파편" },
    });
    const { id: destinyBreakstoneId } = await this.prisma.item.findUniqueOrThrow({
      where: { name: "운명의 돌파석" },
    });
    const { id: destinyDestructionId } = await this.prisma.item.findUniqueOrThrow({
      where: { name: "운명의 파괴석" },
    });
    const { id: destinyGuardianId } = await this.prisma.item.findUniqueOrThrow({
      where: { name: "운명의 수호석" },
    });
    const { id: level1GemId } = await this.prisma.item.findUniqueOrThrow({
      where: { name: "1레벨 보석" },
    });
    const { id: lavaBreathId } = await this.prisma.item.findUniqueOrThrow({
      where: { name: "용암의 숨결" },
    });
    const { id: iceBreathId } = await this.prisma.item.findUniqueOrThrow({
      where: { name: "빙하의 숨결" },
    });
    const { id: cardExpId } = await this.prisma.item.findUniqueOrThrow({
      where: { name: "카드 경험치" },
    });

    for (const contentData of getContentsWithRewards({
      chaosGateId,
      cubeId,
      epicRaidId,
      eponaQuestId,
      fieldBossId,
      guardianRaidId,
      itemIds: {
        cardExpId,
        destinyBreakstoneId,
        destinyDestructionId,
        destinyFragmentId,
        destinyGuardianId,
        goldId,
        iceBreathId,
        lavaBreathId,
        level1GemId,
        sillingId,
      },
      kazerosRaidId,
      kurzanId,
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

  async goldExchangeRate() {
    await this.prisma.goldExchangeRate.create({
      data: { goldAmount: 100, krwAmount: 50 },
    });
  }

  async items() {
    await this.prisma.item.create({
      data: {
        imageUrl:
          "https://res.cloudinary.com/dn74c0eep/image/upload/v1734427388/r2xk6egyoygwsftrvtyw.png",
        isEditable: true,
        kind: ItemKind.EXTRA,
        name: "실링",
        price: 0,
      },
    });

    await this.prisma.item.create({
      data: {
        imageUrl:
          "https://res.cloudinary.com/dn74c0eep/image/upload/v1734427388/pkx5erlffxtsrj1kurqt.png",
        isEditable: true,
        kind: ItemKind.EXTRA,
        name: "카드 경험치",
        price: 0,
      },
    });

    await this.prisma.item.create({
      data: {
        imageUrl:
          "https://res.cloudinary.com/dn74c0eep/image/upload/v1735996903/hdamkxuzmvbwyopjhmcb.png",
        isEditable: false,
        kind: ItemKind.EXTRA,
        name: "골드",
        price: 1,
      },
    });

    const items = [
      {
        imageUrl:
          "https://res.cloudinary.com/dn74c0eep/image/upload/v1734428078/xug2bon7qtiflcqbezza.png",
        kind: ItemKind.MARKET,
        name: "운명의 파편",
        price: 0.17,
      },
      {
        imageUrl:
          "https://res.cloudinary.com/dn74c0eep/image/upload/v1734428435/qn5msm2gc0qtmtc0irlh.png",
        kind: ItemKind.MARKET,
        name: "운명의 돌파석",
        price: 7,
      },
      {
        imageUrl:
          "https://res.cloudinary.com/dn74c0eep/image/upload/v1734428435/xy9a4qf2on63drftnkub.png",
        kind: ItemKind.MARKET,
        name: "운명의 파괴석",
        price: 0.82,
      },
      {
        imageUrl:
          "https://res.cloudinary.com/dn74c0eep/image/upload/v1734428435/azkviadmag8inzq65ajf.png",
        kind: ItemKind.MARKET,
        name: "운명의 수호석",
        price: 0.03,
      },
      {
        imageUrl:
          "https://res.cloudinary.com/dn74c0eep/image/upload/v1734428077/dpqtjeqsuqmvfwzapjj8.png",
        kind: ItemKind.AUCTION,
        name: "1레벨 보석",
        price: 154,
      },
      {
        imageUrl:
          "https://res.cloudinary.com/dn74c0eep/image/upload/v1734428435/xpnlsgxaatshujnzpett.png",
        kind: ItemKind.MARKET,
        name: "용암의 숨결",
        price: 388,
      },
      {
        imageUrl:
          "https://res.cloudinary.com/dn74c0eep/image/upload/v1734428435/k8xcldjkq33qf9l69uim.png",
        kind: ItemKind.MARKET,
        name: "빙하의 숨결",
        price: 193,
      },
    ];

    for (const item of items) {
      await this.prisma.item.create({ data: item });
    }
  }

  async marketItemCategories() {
    await this.prisma.marketItemCategory.createMany({
      data: [
        { code: 40000, isItemScraperEnabled: true, name: "각인서" },
        { code: 50010, isItemScraperEnabled: true, name: "재련 재료" },
        { code: 50020, isItemScraperEnabled: true, name: "재련 추가 재료" },
        { code: 51000, isItemScraperEnabled: true, name: "기타 재료" },
        { code: 51100, isItemScraperEnabled: true, name: "무기 진화 재료" },
      ],
    });
  }

  async marketItems() {
    const categoryMap = new Map<number, number>();

    for (const code of [40000, 50010, 50020]) {
      const category = await this.prisma.marketItemCategory.findUniqueOrThrow({
        where: { code },
      });
      categoryMap.set(code, category.id);
    }

    for (let i = 0; i < marketItemData.length; i++) {
      const item = marketItemData[i];
      const categoryCode = getMarketItemCategoryCode(i);
      const marketItemCategoryId = categoryMap.get(categoryCode)!;

      await this.prisma.marketItem.create({
        data: {
          ...item,
          marketItemCategoryId,
        },
      });
    }
  }

  async marketItemStats() {
    await this.prisma.marketItemStat.createMany({
      data: marketItemStatData,
    });
  }

  async users() {
    await this.prisma.user.create({
      data: {
        displayName: "Owner",
        email: "owner@lostark.com",
        provider: "GOOGLE",
        refId: process.env.OWNER_USER_REF_ID ?? "test-owner-ref-id",
        role: "OWNER",
      },
    });
  }
}
