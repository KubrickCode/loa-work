import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { User, UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async copyOwnerContentRewards(userId: number) {
    const ownerUser = await this.prisma.user.findFirstOrThrow({
      where: { role: UserRole.OWNER },
      include: { contentRewards: true },
    });

    await this.prisma.contentReward.createMany({
      data: ownerUser.contentRewards.map(
        ({ averageQuantity, isSellable, itemName, contentId }) => ({
          averageQuantity,
          isSellable,
          itemName,
          contentId,
          userId,
        }),
      ),
    });
  }
}
