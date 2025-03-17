import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { Prisma } from '@prisma/client';
import { ContentFactory } from './content.factory';

@Injectable()
export class ContentDurationFactory {
  private readonly contentFactory = new ContentFactory(this.prisma);

  constructor(private prisma: PrismaService) {}

  async create(options?: {
    data?: Partial<Prisma.ContentDurationUncheckedCreateInput>;
  }) {
    const content = await this.contentFactory.create();

    return await this.prisma.contentDuration.create({
      data: {
        defaultValue: faker.number.int({ min: 1000, max: 10000 }),
        contentId: content.id,
        ...options?.data,
      },
    });
  }
}
