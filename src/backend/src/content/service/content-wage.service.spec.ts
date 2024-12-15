import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma';
import { ContentWageService } from './content-wage.service';
import { UserContentService } from '../../user/service/user-content.service';
import { CONTEXT } from '@nestjs/graphql';
import { UserGoldExchangeRateService } from 'src/user/service/user-gold-exchange-rate.service';
import {
  ContentRewardItemKind,
  User,
  Content,
  ContentReward,
  ContentSeeMoreReward,
} from '@prisma/client';
import { UserFactory } from 'src/test/factory/user.factory';

describe('ContentWageService', () => {
  const goldItemId = 1;
  const fateFragmentItemId = 2;
  const fateDestructionStoneItemId = 3;
  const fateGuardianStoneItemId = 4;

  let module: TestingModule;
  let service: ContentWageService;
  let prisma: PrismaService;
  let userFactory: UserFactory;
  let testUser: User;
  let testContent: Content & {
    contentRewards: ContentReward[];
    contentSeeMoreRewards: ContentSeeMoreReward[];
  };
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
          id: goldItemId,
          name: '골드',
          kind: ContentRewardItemKind.EXTRA_ITEM,
          defaultPrice: 1,
        },
        {
          id: fateFragmentItemId,
          name: '운명의 파편',
          kind: ContentRewardItemKind.MARKET_ITEM,
          defaultPrice: 0.129,
        },
        {
          id: fateDestructionStoneItemId,
          name: '운명의 파괴석',
          kind: ContentRewardItemKind.MARKET_ITEM,
          defaultPrice: 4.3,
        },
        {
          id: fateGuardianStoneItemId,
          name: '운명의 수호석',
          kind: ContentRewardItemKind.MARKET_ITEM,
          defaultPrice: 0.6,
        },
      ],
    });

    const category = await prisma.contentCategory.create({
      data: {
        name: '에픽 레이드',
      },
    });

    testContent = await prisma.content.create({
      data: {
        name: '[노말]폭풍의 지휘관, 베히모스',
        gate: 1,
        level: 1640,
        contentCategoryId: category.id,
        contentDurations: {
          create: {
            defaultValue: 600,
          },
        },
        contentRewards: {
          create: [
            {
              contentRewardItemId: goldItemId,
              defaultAverageQuantity: 7000,
            },
            {
              contentRewardItemId: fateFragmentItemId,
              defaultAverageQuantity: 3000,
            },
            {
              contentRewardItemId: fateDestructionStoneItemId,
              defaultAverageQuantity: 210,
            },
            {
              contentRewardItemId: fateGuardianStoneItemId,
              defaultAverageQuantity: 420,
            },
          ],
        },
        contentSeeMoreRewards: {
          create: [
            {
              contentRewardItemId: goldItemId,
              quantity: -3100,
            },
            {
              contentRewardItemId: fateFragmentItemId,
              quantity: 4000,
            },
            {
              contentRewardItemId: fateDestructionStoneItemId,
              quantity: 600,
            },
            {
              contentRewardItemId: fateGuardianStoneItemId,
              quantity: 800,
            },
          ],
        },
      },
      include: {
        contentRewards: true,
        contentSeeMoreRewards: true,
      },
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
            contentRewardItemId: goldItemId,
            price: 1,
          },
          {
            userId: testUser.id,
            contentRewardItemId: fateFragmentItemId,
            price: 0.2,
          },
          {
            userId: testUser.id,
            contentRewardItemId: fateDestructionStoneItemId,
            price: 5,
          },
          {
            userId: testUser.id,
            contentRewardItemId: fateGuardianStoneItemId,
            price: 1,
          },
        ],
      });
    });

    it('calculateGold - by user', async () => {
      const gold = await service.calculateGold(
        testContent.contentRewards.map((reward) => ({
          contentRewardItemId: reward.contentRewardItemId,
          averageQuantity: reward.defaultAverageQuantity.toNumber(),
        })),
      );
      expect(gold).toBe(9070);
    });

    it('calculateSeeMoreRewardsGold - by user', async () => {
      const gold = await service.calculateSeeMoreRewardsGold(
        testContent.contentSeeMoreRewards,
      );
      expect(gold).toBe(1500);
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
      const gold = await service.calculateGold(
        testContent.contentRewards.map((reward) => ({
          contentRewardItemId: reward.contentRewardItemId,
          averageQuantity: reward.defaultAverageQuantity.toNumber(),
        })),
      );
      expect(gold).toBe(8542);
    });

    it('calculateSeeMoreRewardsGold - default', async () => {
      const gold = await service.calculateSeeMoreRewardsGold(
        testContent.contentSeeMoreRewards,
      );
      expect(gold).toBe(476);
    });
  });
});
