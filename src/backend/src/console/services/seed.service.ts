import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class SeedService {
  constructor(private prisma: PrismaService) {}

  async all() {
    await this.auctionItemCategories();
    await this.auctionItems();
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
