import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { Prisma, User, UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async copyOwnerContentRewards(userId: number, tx: Prisma.TransactionClient) {
    const ownerUser = await tx.user.findFirstOrThrow({
      where: { role: UserRole.OWNER },
      include: { contentRewards: true },
    });

    await tx.contentReward.createMany({
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
