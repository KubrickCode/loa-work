import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';

@Injectable()
export class ContentRewardItemService {
  constructor(private readonly prisma: PrismaService) {}

  async getPrice(contentRewardItemId: number) {
    const { contentRewardItemPrices } =
      await this.prisma.contentRewardItem.findUniqueOrThrow({
        where: {
          id: contentRewardItemId,
        },
        include: {
          contentRewardItemPrices: {
            take: 1,
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      });

    return contentRewardItemPrices[0].value;
  }
}
