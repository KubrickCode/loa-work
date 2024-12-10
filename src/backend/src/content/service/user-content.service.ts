import { Inject, Injectable, Scope } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { CONTEXT } from '@nestjs/graphql';

@Injectable({ scope: Scope.REQUEST })
export class UserContentService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CONTEXT) private context: any,
  ) {}

  private getCurrentUserId(): number | undefined {
    return this.context.req?.user?.id;
  }

  async getContentRewardItemPrice(contentRewardItemId: number) {
    const userId = this.getCurrentUserId();

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

  async getContentDuration(contentId: number) {
    const userId = this.getCurrentUserId();

    const contentDuration = await this.prisma.contentDuration.findUniqueOrThrow(
      {
        where: {
          contentId,
        },
      },
    );

    return userId
      ? (
          await this.prisma.userContentDuration.findUniqueOrThrow({
            where: {
              contentDurationId_userId: {
                contentDurationId: contentDuration.id,
                userId,
              },
            },
          })
        ).value
      : contentDuration.defaultValue;
  }
}
