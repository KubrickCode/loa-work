import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma';
import { UserContentService } from '../../user/service/user-content.service';
import { CONTEXT } from '@nestjs/graphql';
import { UserGoldExchangeRateService } from 'src/user/service/user-gold-exchange-rate.service';
import { faker } from '@faker-js/faker/.';
import { ContentRewardItemKind } from '@prisma/client';
import { ContentWageService } from 'src/content/service/content-wage.service';
import { AuthProvider } from '.prisma/client';

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

  it('getContentRewardItemPrice - logged in user', async () => {
    const user = await prisma.user.create({
      data: {
        refId: faker.string.uuid(),
        displayName: faker.person.fullName(),
        provider: AuthProvider.KAKAO,
      },
    });
    jest.spyOn(service, 'getUserId').mockReturnValue(user.id);

    const contentRewardItem = await prisma.contentRewardItem.create({
      data: {
        name: faker.lorem.word(),
        kind: ContentRewardItemKind.MARKET_ITEM,
        imageUrl: faker.image.url(),
        isEditable: true,
        contentRewardItemPrices: {
          createMany: {
            data: [{ value: 100 }],
          },
        },
      },
    });

    const userPrice = 250;
    await prisma.userContentRewardItem.create({
      data: {
        userId: user.id,
        contentRewardItemId: contentRewardItem.id,
        price: userPrice,
      },
    });

    const price = await service.getContentRewardItemPrice(contentRewardItem.id);

    expect(price).toBe(userPrice);
  });
});
