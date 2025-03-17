import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { ContentRewardItemKind, Prisma } from '@prisma/client';
import { UniqueEnforcer } from 'enforce-unique';

@Injectable()
export class ContentRewardItemFactory {
  private readonly uniqueEnforcer = new UniqueEnforcer();

  constructor(private prisma: PrismaService) {}

  async create(options?: {
    data?: Partial<Prisma.ContentRewardItemUncheckedCreateInput>;
  }) {
    const name = this.uniqueEnforcer.enforce(faker.word.noun);

    return await this.prisma.contentRewardItem.create({
      data: {
        name,
        kind: ContentRewardItemKind.MARKET_ITEM,
        imageUrl: faker.image.url(),
        ...options?.data,
      },
    });
  }
}
