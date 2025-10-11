import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { Prisma } from "@prisma/client";
import { UniqueEnforcer } from "enforce-unique";
import { ContentCategoryFactory } from "./content-category.factory";

@Injectable()
export class ContentFactory {
  private readonly contentCategoryFactory = new ContentCategoryFactory(this.prisma);
  private readonly uniqueEnforcer = new UniqueEnforcer();

  constructor(private prisma: PrismaService) {}

  async create(options?: { data?: Partial<Prisma.ContentUncheckedCreateInput> }) {
    const name = this.uniqueEnforcer.enforce(faker.word.noun);
    let contentCategoryId = options?.data?.contentCategoryId;

    if (!contentCategoryId) {
      const contentCategory = await this.contentCategoryFactory.create();
      contentCategoryId = contentCategory.id;
    }

    return await this.prisma.content.create({
      data: {
        contentCategoryId,
        level: faker.number.int({ max: 1740, min: 1640 }),
        name,
        ...options?.data,
      },
    });
  }
}
