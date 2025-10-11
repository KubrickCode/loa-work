import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { Prisma } from "@prisma/client";
import { ContentFactory } from "./content.factory";
import { ItemFactory } from "./item.factory";

@Injectable()
export class ContentRewardFactory {
  private readonly contentFactory = new ContentFactory(this.prisma);
  private readonly itemFactory = new ItemFactory(this.prisma);

  constructor(private prisma: PrismaService) {}

  async create(options?: { data?: Partial<Prisma.ContentRewardUncheckedCreateInput> }) {
    let contentId = options?.data?.contentId;
    let itemId = options?.data?.itemId;

    if (!contentId) {
      const content = await this.contentFactory.create();
      contentId = content.id;
    }

    if (!itemId) {
      const item = await this.itemFactory.create();
      itemId = item.id;
    }

    return await this.prisma.contentReward.create({
      data: {
        averageQuantity: faker.number.float({ max: 10000, min: 1 }),
        contentId,
        itemId,
        ...options?.data,
      },
    });
  }
}
