import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma';
import { ContentWageService } from './content-wage.service';
import { UserContentService } from '../../user/service/user-content.service';
import { CONTEXT } from '@nestjs/graphql';
import { UserGoldExchangeRateService } from 'src/user/service/user-gold-exchange-rate.service';
import { ContentRewardItemKind, User } from '@prisma/client';
import { UserFactory } from 'src/test/factory/user.factory';

describe('ContentWageService', () => {
  let module: TestingModule;
  let service: ContentWageService;
  let prisma: PrismaService;
  let userFactory: UserFactory;
  let testUser: User;
  let context: { req: { user: { id: number | undefined } } };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        PrismaService,
        ContentWageService,
        UserContentService,
        UserGoldExchangeRateService,
        UserFactory,
        {
          provide: CONTEXT,
          useValue: { req: { user: { id: undefined } } },
        },
      ],
    }).compile();

    service = module.get(ContentWageService);
    prisma = module.get(PrismaService);
    userFactory = module.get(UserFactory);
    context = module.get(CONTEXT);

    await prisma.clearDatabase();

    testUser = await userFactory.create();

    await prisma.goldExchangeRate.create({
      data: {
        krwAmount: 100,
        goldAmount: 50,
      },
    });

    await prisma.contentRewardItem.createMany({
      data: [
        {
          id: 1,
          name: '골드',
          kind: ContentRewardItemKind.EXTRA_ITEM,
          defaultPrice: 1,
        },
        {
          id: 2,
          name: '운명의 파괴석',
          kind: ContentRewardItemKind.MARKET_ITEM,
          defaultPrice: 10,
        },
        {
          id: 3,
          name: '운명의 수호석',
          kind: ContentRewardItemKind.MARKET_ITEM,
          defaultPrice: 8,
        },
      ],
    });
  });

  afterEach(async () => {
    await prisma.clearDatabase();
  });

  afterAll(async () => {
    await module.close();
  });

  describe('로그인 상태', () => {
    beforeEach(async () => {
      context.req.user.id = testUser.id;

      await prisma.userGoldExchangeRate.create({
        data: {
          userId: testUser.id,
          krwAmount: 100,
          goldAmount: 70,
        },
      });

      await prisma.userContentRewardItem.createMany({
        data: [
          {
            userId: testUser.id,
            contentRewardItemId: 1,
            price: 1,
          },
          {
            userId: testUser.id,
            contentRewardItemId: 2,
            price: 15,
          },
          {
            userId: testUser.id,
            contentRewardItemId: 3,
            price: 12,
          },
        ],
      });
    });

    it('calculateGold - by user', async () => {
      const rewards = [
        {
          contentRewardItemId: 1,
          averageQuantity: 9000,
        },
        {
          contentRewardItemId: 2,
          averageQuantity: 680,
        },
        {
          contentRewardItemId: 3,
          averageQuantity: 1320,
        },
      ];

      const gold = await service.calculateGold(rewards);
      expect(gold).toBe(35040);
    });

    it('calculateWage - by user', async () => {
      const wage = await service.calculateWage({
        gold: 1000,
        duration: 3600,
      });
      expect(wage).toEqual({ krwAmount: 700, goldAmount: 1000 });
    });
  });

  describe('비로그인 상태', () => {
    beforeEach(() => {
      context.req.user.id = undefined;
    });

    it('calculateWage - default', async () => {
      const wage = await service.calculateWage({
        gold: 1000,
        duration: 3600,
      });
      expect(wage).toEqual({ krwAmount: 500, goldAmount: 1000 });
    });

    it('calculateGold - default', async () => {
      const rewards = [
        {
          contentRewardItemId: 2,
          averageQuantity: 148.4,
        },
        {
          contentRewardItemId: 3,
          averageQuantity: 450,
        },
      ];

      const gold = await service.calculateGold(rewards);
      expect(gold).toBe(5084);
    });
  });
});
