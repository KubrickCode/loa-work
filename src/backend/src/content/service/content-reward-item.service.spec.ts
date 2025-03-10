import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma';
import { faker } from '@faker-js/faker/.';
import { ContentRewardItemKind } from '@prisma/client';
import { ContentRewardItemService } from 'src/content/service/content-reward-item.service';

describe('ContentRewardItemService', () => {
  let module: TestingModule;
  let prisma: PrismaService;
  let service: ContentRewardItemService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [PrismaService, ContentRewardItemService],
    }).compile();

    prisma = module.get(PrismaService);
    service = module.get(ContentRewardItemService);
    await prisma.clearDatabase();
  });

  afterEach(async () => {
    await prisma.clearDatabase();
  });

  afterAll(async () => {
    await module.close();
  });

  it('getPrice', async () => {
    const contentRewardItem = await prisma.contentRewardItem.create({
      data: {
        name: faker.lorem.word(),
        kind: ContentRewardItemKind.MARKET_ITEM,
        imageUrl: faker.image.url(),
        contentRewardItemPrices: {
          createMany: {
            data: [{ value: 100 }, { value: 200 }, { value: 300 }],
          },
        },
      },
    });

    const price = (await service.getPrice(contentRewardItem.id)).toNumber();

    expect(price).toBe(100);
  });
});
