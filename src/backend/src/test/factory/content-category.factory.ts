import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { Prisma } from "@prisma/client";
import { UniqueEnforcer } from "enforce-unique";

@Injectable()
export class ContentCategoryFactory {
  private readonly uniqueEnforcer = new UniqueEnforcer();

  constructor(private prisma: PrismaService) {}

  async create(options?: { data?: Partial<Prisma.ContentCategoryUncheckedCreateInput> }) {
    const name = this.uniqueEnforcer.enforce(faker.word.noun);

    return await this.prisma.contentCategory.create({
      data: {
        imageUrl: faker.image.url(),
        name,
        ...options?.data,
      },
    });
  }
}
