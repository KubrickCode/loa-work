import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserSeedService {
  async makeAllSeedData(userId: number, tx: Prisma.TransactionClient) {
    const user = await tx.user.findUniqueOrThrow({
      where: { id: userId },
      include: {
        userItems: true,
      },
    });

    if (!user.userItems.length) {
      await this.makeItems(userId, tx, user.createdAt);
    }
  }

  async makeItems(
    userId: number,
    tx: Prisma.TransactionClient,
    createdAt: Date,
  ) {
    const defaultItems = await tx.item.findMany({
      where: {
        isEditable: true,
      },
    });

    await tx.userItem.createMany({
      data: defaultItems.map(({ id, price }) => ({
        itemId: id,
        price,
        userId,
        createdAt,
      })),
    });
  }
}
