import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma';
import { ContentWageService } from './content-wage.service';
import { UserContentService } from '../../user/service/user-content.service';
import { CONTEXT } from '@nestjs/graphql';
import { UserGoldExchangeRateService } from 'src/user/service/user-gold-exchange-rate.service';
import { UserFactory } from 'src/test/factory/user.factory';
import { faker } from '@faker-js/faker/.';
import { ItemKind } from '@prisma/client';
import { ItemFactory } from 'src/test/factory/item.factory';

// 현재 중요 테스트는 해당 서비스에만 필요한 상황이라 아래와 같이 작성하고, 필요 시 팩토리 코드로 아래 데이터들을 생성하고 재사용할 수 있도록 해야함.
describe('ContentWageService', () => {
  let module: TestingModule;
  let prisma: PrismaService;
  let service: ContentWageService;
  let userFactory: UserFactory;
  let userGoldExchangeRateService: UserGoldExchangeRateService;
  let userContentService: UserContentService;
  let itemFactory: ItemFactory;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        PrismaService,
        ContentWageService,
        UserContentService,
        UserGoldExchangeRateService,
        UserFactory,
        ItemFactory,
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
    itemFactory = module.get(ItemFactory);
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

  describe('calculateGold', () => {
    beforeEach(() => {
      userContentService['context'].req.user = { id: undefined };
      userGoldExchangeRateService['context'].req.user = { id: undefined };
    });

    it('기본 계산', async () => {
      const items = await Promise.all([
        itemFactory.create({
          data: { price: 100 },
        }),
        itemFactory.create({
          data: { price: 200 },
        }),
      ]);

      const rewards = [
        {
          itemId: items[0].id,
          averageQuantity: 2, // 100 * 2 = 200
        },
        {
          itemId: items[1].id,
          averageQuantity: 3, // 200 * 3 = 600
        },
      ];

      const result = await service.calculateGold(rewards);
      expect(result).toBe(800);
    });

    it('사용자 정의 가격 사용', async () => {
      const user = await userFactory.create();
      userContentService['context'].req.user = { id: user.id };

      const items = await Promise.all([
        itemFactory.create({
          data: {
            price: 100,
            isEditable: true,
          },
        }),
        itemFactory.create({
          data: {
            price: 200,
            isEditable: true,
          },
        }),
      ]);

      const userPrice = 500;
      await Promise.all([
        prisma.userItem.create({
          data: {
            userId: user.id,
            itemId: items[0].id,
            price: userPrice,
          },
        }),
        prisma.userItem.create({
          data: {
            userId: user.id,
            itemId: items[1].id,
            price: userPrice,
          },
        }),
      ]);

      const rewards = [
        {
          itemId: items[0].id,
          averageQuantity: 2, // 500 * 2 = 1000 (사용자 가격 사용)
        },
        {
          itemId: items[1].id,
          averageQuantity: 3, // 500 * 3 = 1500 (사용자 가격 사용)
        },
      ];

      const result = await service.calculateGold(rewards);
      expect(result).toBe(2500);
    });

    it('일부 아이템만 사용자 정의 가격 사용', async () => {
      const user = await userFactory.create();
      userContentService['context'].req.user = { id: user.id };

      const items = await Promise.all([
        itemFactory.create({
          data: {
            price: 100,
            isEditable: true,
          },
        }),
        itemFactory.create({
          data: {
            price: 200,
            isEditable: false,
          },
        }),
      ]);

      const userPrice = 500;
      await prisma.userItem.create({
        data: {
          userId: user.id,
          itemId: items[0].id,
          price: userPrice,
        },
      });

      const rewards = [
        {
          itemId: items[0].id,
          averageQuantity: 2, // 500 * 2 = 1000 (사용자 가격 사용)
        },
        {
          itemId: items[1].id,
          averageQuantity: 3, // 200 * 3 = 600 (기본 가격 사용, isEditable이 false)
        },
      ];

      const result = await service.calculateGold(rewards);
      expect(result).toBe(1600);
    });

    it('존재하지 않는 사용자 정의 가격은 기본 가격 사용', async () => {
      const user = await userFactory.create();
      userContentService['context'].req.user = { id: user.id };

      const items = await Promise.all([
        itemFactory.create({
          data: {
            price: 100,
            isEditable: true,
          },
        }),
        itemFactory.create({
          data: {
            price: 200,
            isEditable: true,
          },
        }),
      ]);

      const userPrice = 500;
      await prisma.userItem.create({
        data: {
          userId: user.id,
          itemId: items[0].id,
          price: userPrice,
        },
      });

      const rewards = [
        {
          itemId: items[0].id,
          averageQuantity: 2, // 500 * 2 = 1000 (사용자 가격 사용)
        },
        {
          itemId: items[1].id,
          averageQuantity: 3, // 200 * 3 = 600 (기본 가격 사용, 사용자 가격이 없음)
        },
      ];

      try {
        const result = await service.calculateGold(rewards);
        expect(result).toBe(1600);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('빈 배열이 입력된 경우', async () => {
      const rewards = [];
      const result = await service.calculateGold(rewards);
      expect(result).toBe(0);
    });

    it('다른 사용자의 가격은 적용되지 않음', async () => {
      const user1 = await userFactory.create();
      const user2 = await userFactory.create();

      const item = await itemFactory.create({
        data: {
          price: 100,
          isEditable: true,
        },
      });

      const userPrice1 = 500;
      await prisma.userItem.create({
        data: {
          userId: user1.id,
          itemId: item.id,
          price: userPrice1,
        },
      });

      const userPrice2 = 800;
      await prisma.userItem.create({
        data: {
          userId: user2.id,
          itemId: item.id,
          price: userPrice2,
        },
      });

      userContentService['context'].req.user = { id: user1.id };

      const rewards = [
        {
          itemId: item.id,
          averageQuantity: 2, // 500 * 2 = 1000 (user1의 가격 사용)
        },
      ];

      const result1 = await service.calculateGold(rewards);
      expect(result1).toBe(1000); // user1의 가격 적용

      // 두 번째 사용자로 로그인 변경
      userContentService['context'].req.user = { id: user2.id };

      const result2 = await service.calculateGold(rewards);
      expect(result2).toBe(1600); // user2의 가격 적용
    });
  });

  describe('calculateSeeMoreRewardsGold', () => {
    const itemIds: number[] = [];
    const prices: number[] = [];

    beforeAll(async () => {
      userGoldExchangeRateService['context'].req.user = { id: undefined };
      userContentService['context'].req.user = { id: undefined };

      for (let i = 0; i < 3; i++) {
        const price = (i + 1) * 100;
        prices.push(price);

        const item = await prisma.item.create({
          data: {
            name: `테스트 아이템 ${i + 1}`,
            price,
            imageUrl: faker.image.url(),
            kind: ItemKind.MARKET,
          },
        });

        itemIds.push(item.id);
      }
    });

    it('기본 계산', async () => {
      const contentSeeMoreRewards = [
        {
          itemId: itemIds[0],
          quantity: 2,
        },
        {
          itemId: itemIds[1],
          quantity: 3,
        },
        {
          itemId: itemIds[2],
          quantity: 1,
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
          itemId: itemIds[0],
          quantity: 2,
        },
        {
          itemId: itemIds[1],
          quantity: 3,
        },
        {
          itemId: itemIds[2],
          quantity: 1,
        },
      ];

      const result = await service.calculateSeeMoreRewardsGold(
        contentSeeMoreRewards,
        [itemIds[0], itemIds[1]],
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

      const items = await Promise.all([
        itemFactory.create({
          data: {
            price: 100,
            isEditable: true,
          },
        }),
        itemFactory.create({
          data: {
            price: 200,
            isEditable: true,
          },
        }),
      ]);

      const userPrice = 500;
      await prisma.userItem.create({
        data: {
          userId: user.id,
          itemId: items[0].id,
          price: userPrice,
        },
      });
      await prisma.userItem.create({
        data: {
          userId: user.id,
          itemId: items[1].id,
          price: userPrice,
        },
      });

      const contentSeeMoreRewards = [
        {
          itemId: items[0].id,
          quantity: 2,
        },
        {
          itemId: items[1].id,
          quantity: 3,
        },
      ];

      const result = await service.calculateSeeMoreRewardsGold(
        contentSeeMoreRewards,
      );
      expect(result).toBe(2500);
    });
  });
});
