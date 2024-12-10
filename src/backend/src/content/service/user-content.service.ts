import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma';

@Injectable()
export class UserContentService {
  constructor(private readonly prisma: PrismaService) {}

  async getContentRewardItemPrice(
    contentRewardItemId: number,
    userId?: number,
  ) {
    const contentRewardItem =
      await this.prisma.contentRewardItem.findUniqueOrThrow({
        where: {
          id: contentRewardItemId,
        },
      });

    const price = userId
      ? (
          await this.prisma.userContentRewardItem.findUniqueOrThrow({
            where: {
              userId_contentRewardItemId: { userId, contentRewardItemId },
            },
          })
        ).price
      : contentRewardItem.defaultPrice;

    return price.toNumber();
  }
}
