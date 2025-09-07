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
    let contentId = options?.data?.contentId;

    if (!contentId) {
      const content = await this.contentFactory.create();
      contentId = content.id;
    }

    return await this.prisma.contentDuration.create({
      data: {
        value: faker.number.int({ min: 1000, max: 10000 }),
        contentId,
        ...options?.data,
      },
    });
  }
}
