import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma';
import { UserContentService } from '../../user/service/user-content.service';
import { CONTEXT } from '@nestjs/graphql';
import { UserGoldExchangeRateService } from 'src/user/service/user-gold-exchange-rate.service';
import { faker } from '@faker-js/faker/.';
import { ContentRewardItemKind } from '@prisma/client';
import { ContentWageService } from 'src/content/service/content-wage.service';

describe('UserContentService', () => {
  let module: TestingModule;
  let prisma: PrismaService;
  let service: UserContentService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        PrismaService,
        ContentWageService,
        UserContentService,
        UserGoldExchangeRateService,
        {
          provide: CONTEXT,
          useValue: { req: { user: { id: undefined } } },
        },
      ],
    }).compile();

    prisma = module.get(PrismaService);
    service = module.get(UserContentService);
    await prisma.clearDatabase();
  });

  afterEach(async () => {
    await prisma.clearDatabase();
  });

  afterAll(async () => {
    await module.close();
  });

  it('getContentRewardItemPrice - guest', async () => {
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

    const price = await service.getContentRewardItemPrice(contentRewardItem.id);

    expect(price).toBe(100);
  });
});
