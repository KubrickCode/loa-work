import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { Prisma } from '@prisma/client';
import { UniqueEnforcer } from 'enforce-unique';
import { ContentCategoryFactory } from './content-category.factory';

@Injectable()
export class ContentFactory {
  private readonly uniqueEnforcer = new UniqueEnforcer();
  private readonly contentCategoryFactory = new ContentCategoryFactory(
    this.prisma,
  );

  constructor(private prisma: PrismaService) {}

  async create(options?: {
    data?: Partial<Prisma.ContentUncheckedCreateInput>;
  }) {
    const name = this.uniqueEnforcer.enforce(faker.word.noun);
    let contentCategoryId = options?.data?.contentCategoryId;

    if (!contentCategoryId) {
      const contentCategory = await this.contentCategoryFactory.create();
      contentCategoryId = contentCategory.id;
    }

    return await this.prisma.content.create({
      data: {
        name,
        contentCategoryId,
        level: faker.number.int({ min: 1640, max: 1740 }),
        ...options?.data,
      },
    });
  }
}
