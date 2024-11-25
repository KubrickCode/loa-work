import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { ContentType, Prisma } from '@prisma/client';

@Injectable()
export class SeedService {
  constructor(private prisma: PrismaService) {}

  async all() {
    await this.auctionItemCategories();
    await this.auctionItems();
    await this.contents();
    await this.extraItems();
    await this.minimumWage();
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
    const guardianRaids = [
      {
        level: 1640,
        name: '아게오로스',
      },
      {
        level: 1680,
        name: '스콜라키아',
      },
    ].map((content) => ({
      ...content,
      type: ContentType.GUARDIAN_RAID,
    }));

    const kurzanFronts = [
      {
        level: 1640,
        name: '아비도스 1 작전',
      },
      {
        level: 1660,
        name: '아비도스 2 작전',
      },
      {
        level: 1680,
        name: '아비도스 3 작전',
      },
    ].map((content) => ({
      ...content,
      type: ContentType.KURZAN_FRONT,
    }));

    const cubes = [
      {
        level: 1640,
        name: '제 1 해금',
      },
      {
        level: 1680,
        name: '제 2 해금',
      },
    ].map((content) => ({
      ...content,
      type: ContentType.CUBE,
    }));

    const epicRaids = [{ level: 1640, name: '폭풍의 지휘관, 베히모스' }].map(
      (content) => ({
        ...content,
        type: ContentType.EPIC_RAID,
      }),
    );

    const kazerosRaids = [
      { level: 1640, name: '[하드]붉어진 백야의 나선 - 1관문' },
      { level: 1640, name: '[하드]붉어진 백야의 나선 - 2관문' },
      { level: 1660, name: '[노말]대지를 부수는 업화의 궤적 - 1관문' },
      { level: 1660, name: '[노말]대지를 부수는 업화의 궤적 - 2관문' },
      { level: 1670, name: '[노말]부유하는 악몽의 진혼곡 - 1관문' },
      { level: 1670, name: '[노말]부유하는 악몽의 진혼곡 - 2관문' },
      { level: 1680, name: '[하드]대지를 부수는 업화의 궤적 - 1관문' },
      { level: 1680, name: '[하드]대지를 부수는 업화의 궤적 - 2관문' },
      { level: 1690, name: '[하드]부유하는 악몽의 진혼곡 - 1관문' },
      { level: 1690, name: '[하드]부유하는 악몽의 진혼곡 - 2관문' },
    ].map((content) => ({
      ...content,
      type: ContentType.KAZEROS_RAID,
    }));

    const legionCommanderRaids = [
      { level: 1630, name: '[하드]어둠의 바라트론 - 1관문' },
      { level: 1630, name: '[하드]어둠의 바라트론 - 2관문' },
      { level: 1630, name: '[하드]어둠의 바라트론 - 3관문' },
      { level: 1630, name: '[하드]어둠의 바라트론 - 4관문' },
    ].map((content) => ({
      ...content,
      type: ContentType.LEGION_COMMANDER_RAID,
    }));

    await this.prisma.content.createMany({
      data: [
        ...guardianRaids,
        ...kurzanFronts,
        ...cubes,
        ...epicRaids,
        ...kazerosRaids,
        ...legionCommanderRaids,
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
}
