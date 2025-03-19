import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { Prisma } from '@prisma/client';
import { ContentFactory } from './content.factory';
import { ContentRewardItemFactory } from './content-reward-item.factory';

@Injectable()
export class ContentRewardFactory {
  private readonly contentFactory = new ContentFactory(this.prisma);
  private readonly contentRewardItemFactory = new ContentRewardItemFactory(
    this.prisma,
  );

  constructor(private prisma: PrismaService) {}

  async create(options?: {
    data?: Partial<Prisma.ContentRewardUncheckedCreateInput>;
  }) {
    let contentId = options?.data?.contentId;
    let contentRewardItemId = options?.data?.contentRewardItemId;

    if (!contentId) {
      const content = await this.contentFactory.create();
      contentId = content.id;
    }

    if (!contentRewardItemId) {
      const contentRewardItem = await this.contentRewardItemFactory.create();
      contentRewardItemId = contentRewardItem.id;
    }

    return await this.prisma.contentReward.create({
      data: {
        contentId,
        contentRewardItemId,
        defaultAverageQuantity: faker.number.float({ min: 1, max: 10000 }),
        ...options?.data,
      },
    });
  }
}
