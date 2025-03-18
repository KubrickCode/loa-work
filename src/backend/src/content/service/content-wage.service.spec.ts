import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma';
import { ContentWageService } from './content-wage.service';
import { UserContentService } from '../../user/service/user-content.service';
import { CONTEXT } from '@nestjs/graphql';
import { UserGoldExchangeRateService } from 'src/user/service/user-gold-exchange-rate.service';
import { UserFactory } from 'src/test/factory/user.factory';
import { faker } from '@faker-js/faker/.';
import { ContentRewardItemKind } from '@prisma/client';
import { ContentRewardItemFactory } from 'src/test/factory/content-reward-item.factory';

// 현재 중요 테스트는 해당 서비스에만 필요한 상황이라 아래와 같이 작성하고, 필요 시 팩토리 코드로 아래 데이터들을 생성하고 재사용할 수 있도록 해야함.
describe('ContentWageService', () => {
  let module: TestingModule;
  let prisma: PrismaService;
  let service: ContentWageService;
  let userFactory: UserFactory;
  let userGoldExchangeRateService: UserGoldExchangeRateService;
  let userContentService: UserContentService;
  let contentRewardItemFactory: ContentRewardItemFactory;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        PrismaService,
        ContentWageService,
        UserContentService,
        UserGoldExchangeRateService,
        UserFactory,
        ContentRewardItemFactory,
        {
          provide: CONTEXT,
          useValue: { req: { user: { id: undefined } } },
        },
      ],
    }).compile();

    prisma = module.get(PrismaService);
    service = module.get(ContentWageService);
    userFactory = module.get(UserFactory);
    userGoldExchangeRateService = module.get(UserGoldExchangeRateService);
    userContentService = module.get(UserContentService);
    contentRewardItemFactory = module.get(ContentRewardItemFactory);
  });

  afterAll(async () => {
    await module.close();
  });

  describe('calculateWage', () => {
    const gold = 1000;
    const duration = 600; // 10 minutes

    beforeAll(async () => {
      await prisma.goldExchangeRate.create({
        data: {
          krwAmount: 25,
          goldAmount: 100,
        },
      });
    });

    it('기본 계산(실제 환율 사용)', async () => {
      const result = await service.calculateWage({ gold, duration });

      expect(result).toEqual({
        krwAmountPerHour: 1500,
        goldAmountPerHour: 6000,
      });
    });

    it('기본 계산(유저 환율 사용)', async () => {
      const user = await userFactory.create();

      await prisma.userGoldExchangeRate.create({
        data: {
          userId: user.id,
          krwAmount: 30,
          goldAmount: 100,
        },
      });

      userGoldExchangeRateService['context'].req.user = { id: user.id };

      const result = await service.calculateWage({ gold, duration });

      expect(result).toEqual({
        krwAmountPerHour: 1800,
        goldAmountPerHour: 6000,
      });
    });
  });

  describe('calculateSeeMoreRewardsGold', () => {
    const contentRewardItemIds: number[] = [];
    const prices: number[] = [];

    beforeAll(async () => {
      userGoldExchangeRateService['context'].req.user = { id: undefined };
      userContentService['context'].req.user = { id: undefined };

      for (let i = 0; i < 3; i++) {
        const price = (i + 1) * 100;
        prices.push(price);

        const contentRewardItem = await prisma.contentRewardItem.create({
          data: {
            name: `테스트 아이템 ${i + 1}`,
            price,
            imageUrl: faker.image.url(),
            kind: ContentRewardItemKind.MARKET_ITEM,
          },
        });

        contentRewardItemIds.push(contentRewardItem.id);
      }
    });

    it('기본 계산', async () => {
      const contentSeeMoreRewards = [
        {
          contentRewardItemId: contentRewardItemIds[0],
          quantity: { toNumber: () => 2 },
        },
        {
          contentRewardItemId: contentRewardItemIds[1],
          quantity: { toNumber: () => 3 },
        },
        {
          contentRewardItemId: contentRewardItemIds[2],
          quantity: { toNumber: () => 1 },
        },
      ];

      const result = await service.calculateSeeMoreRewardsGold(
        contentSeeMoreRewards,
      );
      expect(result).toBe(1100);
    });

    it('필터를 적용한 계산', async () => {
      const contentSeeMoreRewards = [
        {
          contentRewardItemId: contentRewardItemIds[0],
          quantity: { toNumber: () => 2 },
        },
        {
          contentRewardItemId: contentRewardItemIds[1],
          quantity: { toNumber: () => 3 },
        },
        {
          contentRewardItemId: contentRewardItemIds[2],
          quantity: { toNumber: () => 1 },
        },
      ];

      const result = await service.calculateSeeMoreRewardsGold(
        contentSeeMoreRewards,
        [contentRewardItemIds[0], contentRewardItemIds[1]],
      );
      expect(result).toBe(800);
    });

    it('빈 배열이 입력된 경우', async () => {
      const contentSeeMoreRewards = [];
      const result = await service.calculateSeeMoreRewardsGold(
        contentSeeMoreRewards,
      );
      expect(result).toBe(0);
    });

    it('사용자 정의 가격 사용', async () => {
      const user = await userFactory.create();
      userContentService['context'].req.user = { id: user.id };
      userGoldExchangeRateService['context'].req.user = { id: user.id };

      const contentRewardItems = await Promise.all([
        contentRewardItemFactory.create({
          data: {
            price: 100,
            isEditable: true,
          },
        }),
        contentRewardItemFactory.create({
          data: {
            price: 200,
            isEditable: true,
          },
        }),
      ]);

      const userPrice = 500;
      await prisma.userContentRewardItem.create({
        data: {
          userId: user.id,
          contentRewardItemId: contentRewardItems[0].id,
          price: userPrice,
        },
      });
      await prisma.userContentRewardItem.create({
        data: {
          userId: user.id,
          contentRewardItemId: contentRewardItems[1].id,
          price: userPrice,
        },
      });

      const contentSeeMoreRewards = [
        {
          contentRewardItemId: contentRewardItems[0].id,
          quantity: { toNumber: () => 2 },
        },
        {
          contentRewardItemId: contentRewardItems[1].id,
          quantity: { toNumber: () => 3 },
        },
      ];

      const result = await service.calculateSeeMoreRewardsGold(
        contentSeeMoreRewards,
      );
      expect(result).toBe(2500);
    });
  });
});
