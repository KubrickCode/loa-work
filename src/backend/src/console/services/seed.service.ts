import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class SeedService {
  constructor(private prisma: PrismaService) {}

  async all() {
    await this.auctionItems();
  }

  async auctionItems() {
    type Option = Pick<Prisma.AuctionItemCreateInput, 'name' | 'imageSrc'>;
    let damageGems: Option[] = [];
    let coolDownGems: Option[] = [];

    for (let i = 1; i < 11; i++) {
      damageGems.push({
        name: `${i}레벨 겁화의 보석`,
        imageSrc: `https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_${
          95 + i
        }.png`,
      });

      coolDownGems.push({
        name: `${i}레벨 작열의 보석`,
        imageSrc: `https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_${
          105 + i
        }.png`,
      });
    }

    await this.prisma.auctionItem.createMany({
      data: [...damageGems, ...coolDownGems],
    });
  }
}
