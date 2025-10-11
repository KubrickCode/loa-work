import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { ItemKind, Prisma } from "@prisma/client";
import { UniqueEnforcer } from "enforce-unique";

@Injectable()
export class ItemFactory {
  private readonly uniqueEnforcer = new UniqueEnforcer();

  constructor(private prisma: PrismaService) {}

  async create(options?: { data?: Partial<Prisma.ItemUncheckedCreateInput> }) {
    const name = this.uniqueEnforcer.enforce(faker.word.noun);

    return await this.prisma.item.create({
      data: {
        imageUrl: faker.image.url(),
        kind: ItemKind.MARKET,
        name,
        ...options?.data,
      },
    });
  }
}
