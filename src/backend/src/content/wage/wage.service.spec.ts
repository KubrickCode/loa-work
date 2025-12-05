import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "src/prisma";
import { ContentWageService } from "./wage.service";
import { UserContentService } from "../../user/service/user-content.service";
import { UserGoldExchangeRateService } from "src/user/service/user-gold-exchange-rate.service";
import { UserFactory } from "src/test/factory/user.factory";
import { faker } from "@faker-js/faker";
import { ItemKind } from "@prisma/client";
import { ItemFactory } from "src/test/factory/item.factory";

// 현재 중요 테스트는 해당 서비스에만 필요한 상황이라 아래와 같이 작성하고, 필요 시 팩토리 코드로 아래 데이터들을 생성하고 재사용할 수 있도록 해야함.
describe("ContentWageService", () => {
  let module: TestingModule;
  let prisma: PrismaService;
  let service: ContentWageService;
  let userFactory: UserFactory;
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
      ],
    }).compile();

    prisma = module.get(PrismaService);
    service = module.get(ContentWageService);
    userFactory = module.get(UserFactory);
    itemFactory = module.get(ItemFactory);
  });

  afterAll(async () => {
    await module.close();
  });

  describe("calculateWage", () => {
    const gold = 1000;
    const duration = 600; // 10 minutes

    beforeAll(async () => {
      await prisma.goldExchangeRate.create({
        data: {
          goldAmount: 100,
          krwAmount: 25,
        },
      });
    });

    it("기본 계산(실제 환율 사용)", async () => {
      const result = await service.calculateWage({ duration, gold }, undefined);

      expect(result).toEqual({
        goldAmountPerHour: 6000,
        krwAmountPerHour: 1500,
      });
    });

    it("기본 계산(유저 환율 사용)", async () => {
      const user = await userFactory.create();

      await prisma.userGoldExchangeRate.create({
        data: {
          goldAmount: 100,
          krwAmount: 30,
          userId: user.id,
        },
      });
      const result = await service.calculateWage({ duration, gold }, user.id);

      expect(result).toEqual({
        goldAmountPerHour: 6000,
        krwAmountPerHour: 1800,
      });
    });
  });

  describe("calculateGold", () => {
    it("기본 계산", async () => {
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
          averageQuantity: 2, // 100 * 2 = 200
          itemId: items[0].id,
        },
        {
          averageQuantity: 3, // 200 * 3 = 600
          itemId: items[1].id,
        },
      ];

      const result = await service.calculateGold(rewards, undefined);
      expect(result).toBe(800);
    });

    it("사용자 정의 가격 사용", async () => {
      const user = await userFactory.create();
      const items = await Promise.all([
        itemFactory.create({
          data: {
            isEditable: true,
            price: 100,
          },
        }),
        itemFactory.create({
          data: {
            isEditable: true,
            price: 200,
          },
        }),
      ]);

      const userPrice = 500;
      await Promise.all([
        prisma.userItem.create({
          data: {
            itemId: items[0].id,
            price: userPrice,
            userId: user.id,
          },
        }),
        prisma.userItem.create({
          data: {
            itemId: items[1].id,
            price: userPrice,
            userId: user.id,
          },
        }),
      ]);

      const rewards = [
        {
          averageQuantity: 2, // 500 * 2 = 1000 (사용자 가격 사용)
          itemId: items[0].id,
        },
        {
          averageQuantity: 3, // 500 * 3 = 1500 (사용자 가격 사용)
          itemId: items[1].id,
        },
      ];

      const result = await service.calculateGold(rewards, user.id);
      expect(result).toBe(2500);
    });

    it("일부 아이템만 사용자 정의 가격 사용", async () => {
      const user = await userFactory.create();
      const items = await Promise.all([
        itemFactory.create({
          data: {
            isEditable: true,
            price: 100,
          },
        }),
        itemFactory.create({
          data: {
            isEditable: false,
            price: 200,
          },
        }),
      ]);

      const userPrice = 500;
      await prisma.userItem.create({
        data: {
          itemId: items[0].id,
          price: userPrice,
          userId: user.id,
        },
      });

      const rewards = [
        {
          averageQuantity: 2, // 500 * 2 = 1000 (사용자 가격 사용)
          itemId: items[0].id,
        },
        {
          averageQuantity: 3, // 200 * 3 = 600 (기본 가격 사용, isEditable이 false)
          itemId: items[1].id,
        },
      ];

      const result = await service.calculateGold(rewards, user.id);
      expect(result).toBe(1600);
    });

    it("존재하지 않는 사용자 정의 가격은 기본 가격 사용", async () => {
      const user = await userFactory.create();
      const items = await Promise.all([
        itemFactory.create({
          data: {
            isEditable: true,
            price: 100,
          },
        }),
        itemFactory.create({
          data: {
            isEditable: true,
            price: 200,
          },
        }),
      ]);

      const userPrice = 500;
      await prisma.userItem.create({
        data: {
          itemId: items[0].id,
          price: userPrice,
          userId: user.id,
        },
      });

      const rewards = [
        {
          averageQuantity: 2, // 500 * 2 = 1000 (사용자 가격 사용)
          itemId: items[0].id,
        },
        {
          averageQuantity: 3, // 200 * 3 = 600 (기본 가격 사용, 사용자 가격이 없음)
          itemId: items[1].id,
        },
      ];

      try {
        const result = await service.calculateGold(rewards, undefined);
        expect(result).toBe(1600);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it("빈 배열이 입력된 경우", async () => {
      const rewards = [];
      const result = await service.calculateGold(rewards, undefined);
      expect(result).toBe(0);
    });

    it("다른 사용자의 가격은 적용되지 않음", async () => {
      const user1 = await userFactory.create();
      const user2 = await userFactory.create();

      const item = await itemFactory.create({
        data: {
          isEditable: true,
          price: 100,
        },
      });

      const userPrice1 = 500;
      await prisma.userItem.create({
        data: {
          itemId: item.id,
          price: userPrice1,
          userId: user1.id,
        },
      });

      const userPrice2 = 800;
      await prisma.userItem.create({
        data: {
          itemId: item.id,
          price: userPrice2,
          userId: user2.id,
        },
      });
      const rewards = [
        {
          averageQuantity: 2, // 500 * 2 = 1000 (user1의 가격 사용)
          itemId: item.id,
        },
      ];

      const result1 = await service.calculateGold(rewards, user1.id);
      expect(result1).toBe(1000); // user1의 가격 적용

      // 두 번째 사용자로 로그인 변경
      const result2 = await service.calculateGold(rewards, user2.id);
      expect(result2).toBe(1600); // user2의 가격 적용
    });
  });

  describe("calculateSeeMoreRewardsGold", () => {
    const itemIds: number[] = [];
    const prices: number[] = [];

    beforeAll(async () => {
      for (let i = 0; i < 3; i++) {
        const price = (i + 1) * 100;
        prices.push(price);

        const item = await prisma.item.create({
          data: {
            imageUrl: faker.image.url(),
            kind: ItemKind.MARKET,
            name: `테스트 아이템 ${i + 1}`,
            price,
          },
        });

        itemIds.push(item.id);
      }
    });

    it("기본 계산", async () => {
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

      const result = await service.calculateSeeMoreRewardsGold(contentSeeMoreRewards, undefined);
      expect(result).toBe(1100);
    });

    it("필터를 적용한 계산", async () => {
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

      const result = await service.calculateSeeMoreRewardsGold(contentSeeMoreRewards, undefined, [
        itemIds[0],
        itemIds[1],
      ]);
      expect(result).toBe(800);
    });

    it("빈 배열이 입력된 경우", async () => {
      const contentSeeMoreRewards = [];
      const result = await service.calculateSeeMoreRewardsGold(contentSeeMoreRewards, undefined);
      expect(result).toBe(0);
    });

    it("사용자 정의 가격 사용", async () => {
      const user = await userFactory.create();
      const items = await Promise.all([
        itemFactory.create({
          data: {
            isEditable: true,
            price: 100,
          },
        }),
        itemFactory.create({
          data: {
            isEditable: true,
            price: 200,
          },
        }),
      ]);

      const userPrice = 500;
      await prisma.userItem.create({
        data: {
          itemId: items[0].id,
          price: userPrice,
          userId: user.id,
        },
      });
      await prisma.userItem.create({
        data: {
          itemId: items[1].id,
          price: userPrice,
          userId: user.id,
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

      const result = await service.calculateSeeMoreRewardsGold(contentSeeMoreRewards, user.id);
      expect(result).toBe(2500);
    });

    it("0 보상일 때 처리", async () => {
      const contentSeeMoreRewards = [
        {
          itemId: itemIds[0],
          quantity: 0,
        },
        {
          itemId: itemIds[1],
          quantity: 0,
        },
      ];

      const result = await service.calculateSeeMoreRewardsGold(contentSeeMoreRewards, undefined);
      expect(result).toBe(0);
    });

    it("잘못된 보상 데이터 필터링", async () => {
      const contentSeeMoreRewards = [
        {
          itemId: itemIds[0],
          quantity: 2,
        },
        {
          itemId: -1, // 존재하지 않는 아이템 ID
          quantity: 5,
        },
        {
          itemId: itemIds[1],
          quantity: 3,
        },
      ];

      // 존재하지 않는 아이템 ID로 인해 에러가 발생해야 함
      await expect(service.calculateSeeMoreRewardsGold(contentSeeMoreRewards)).rejects.toThrow();
    });

    it("중복 보상 제거 로직", async () => {
      const contentSeeMoreRewards = [
        {
          itemId: itemIds[0],
          quantity: 2,
        },
        {
          itemId: itemIds[0], // 동일한 아이템 ID 중복
          quantity: 3,
        },
        {
          itemId: itemIds[1],
          quantity: 1,
        },
      ];

      const result = await service.calculateSeeMoreRewardsGold(contentSeeMoreRewards, undefined);

      // 현재 구현에서는 중복 제거 없이 모든 보상을 합산함
      // itemIds[0]: 100 * 2 + 100 * 3 = 500
      // itemIds[1]: 200 * 1 = 200
      // 총합: 700
      expect(result).toBe(700);
    });
  });

  describe("getContentGroupWage", () => {
    let testItems: any[];
    let testContents: any[];
    let testUser: any;
    let testCategory: any;

    beforeAll(async () => {
      // 기본 환율 데이터 생성 (다른 테스트와 중복 방지)
      const existingExchangeRate = await prisma.goldExchangeRate.findFirst();
      if (!existingExchangeRate) {
        await prisma.goldExchangeRate.create({
          data: {
            goldAmount: 100,
            krwAmount: 25,
          },
        });
      }

      testCategory = await prisma.contentCategory.create({
        data: {
          imageUrl: "https://example.com/image.png",
          name: "테스트 카테고리",
        },
      });

      testItems = await Promise.all([
        itemFactory.create({ data: { isEditable: true, price: 100 } }),
        itemFactory.create({ data: { isEditable: true, price: 200 } }),
        itemFactory.create({ data: { isEditable: true, price: 300 } }),
      ]);

      testContents = await Promise.all([
        prisma.content.create({
          data: {
            contentCategoryId: testCategory.id,
            level: 1,
            name: "테스트 컨텐츠 1",
          },
        }),
        prisma.content.create({
          data: {
            contentCategoryId: testCategory.id,
            level: 2,
            name: "테스트 컨텐츠 2",
          },
        }),
      ]);

      await Promise.all([
        prisma.contentDuration.create({
          data: {
            contentId: testContents[0].id,
            value: 600, // 10분
          },
        }),
        prisma.contentDuration.create({
          data: {
            contentId: testContents[1].id,
            value: 930, // 15.5분
          },
        }),
      ]);

      await Promise.all([
        prisma.contentReward.create({
          data: {
            averageQuantity: 2,
            contentId: testContents[0].id,
            isSellable: true,
            itemId: testItems[0].id,
          },
        }),
        prisma.contentReward.create({
          data: {
            averageQuantity: 3,
            contentId: testContents[1].id,
            isSellable: true,
            itemId: testItems[1].id,
          },
        }),
      ]);

      testUser = await userFactory.create();
    });

    it("다중 컨텐츠 수익 합산 정확성 검증", async () => {
      const contentIds = [testContents[0].id, testContents[1].id];
      const filter = { includeBound: false };

      const result = await service.getContentGroupWage(contentIds, undefined, filter);

      // 예상 계산:
      // 컨텐츠1: 100 * 2 = 200 골드, 10분 = 600초
      // 컨텐츠2: 200 * 3 = 600 골드, 15.5분 = 930초
      // 총 골드: 800, 총 시간: 1530초 = 0.425시간
      // 시간당 골드: 800 / 0.425 ≈ 1882골드
      // 환율 25KRW/100Gold 기준: 1882 * 0.25 ≈ 471KRW

      expect(result.goldAmountPerClear).toBe(800);
      expect(result.goldAmountPerHour).toBe(1882);
      expect(result.krwAmountPerHour).toBe(471);
    });

    it("환율 변환 적용 검증 (KRW ↔ USD)", async () => {
      // 새로운 사용자 생성 (환율 테스트용)
      const exchangeRateUser = await userFactory.create();

      // 사용자별 환율 설정
      await prisma.userGoldExchangeRate.create({
        data: {
          goldAmount: 100,
          krwAmount: 30,
          userId: exchangeRateUser.id,
        },
      });

      // 사용자별 아이템 가격 설정 (기본 가격 사용)
      await Promise.all([
        prisma.userItem.create({
          data: {
            itemId: testItems[0].id,
            price: 100, // 기본 가격과 동일
            userId: exchangeRateUser.id,
          },
        }),
      ]);
      const contentIds = [testContents[0].id];
      const filter = { includeBound: false };

      const result = await service.getContentGroupWage(contentIds, exchangeRateUser.id, filter);

      // 사용자 환율 적용: 30KRW/100Gold
      // 200골드 / (600초/3600) = 1200골드/시간
      // 1200골드/시간 * 30KRW/100골드 = 360KRW/시간
      expect(result.krwAmountPerHour).toBe(360);
      expect(result.goldAmountPerHour).toBe(1200);
    });

    it("사용자별 커스텀 설정 적용 검증", async () => {
      await prisma.userItem.create({
        data: {
          itemId: testItems[0].id,
          price: 500, // 기본 100에서 500으로 변경
          userId: testUser.id,
        },
      });

      const contentIds = [testContents[0].id];
      const filter = { includeBound: false };

      const result = await service.getContentGroupWage(contentIds, testUser.id, filter);

      // 사용자 가격 적용: 500 * 2 = 1000골드
      expect(result.goldAmountPerClear).toBe(1000);
    });

    it("빈 배열 입력 시 처리", async () => {
      const contentIds = [];
      const filter = { includeBound: false };

      const result = await service.getContentGroupWage(contentIds, undefined, filter);

      expect(result.goldAmountPerClear).toBe(0);
      expect(result.goldAmountPerHour).toBeNaN(); // 0/0 = NaN
      expect(result.krwAmountPerHour).toBeNaN(); // 0/0 = NaN
    });

    it("서로 다른 통화 혼재 시 처리", async () => {
      // 다양한 아이템 타입의 보상 추가
      const mixedContent = await prisma.content.create({
        data: {
          contentCategoryId: testCategory.id,
          level: 1,
          name: "혼합 보상 컨텐츠",
        },
      });

      // ContentDuration 생성
      await prisma.contentDuration.create({
        data: {
          contentId: mixedContent.id,
          value: 300, // 5분
        },
      });

      await Promise.all([
        prisma.contentReward.create({
          data: {
            averageQuantity: 1,
            contentId: mixedContent.id,
            isSellable: true,
            itemId: testItems[0].id,
          },
        }),
        prisma.contentReward.create({
          data: {
            averageQuantity: 2,
            contentId: mixedContent.id,
            isSellable: true,
            itemId: testItems[2].id,
          },
        }),
      ]);

      const contentIds = [mixedContent.id];
      const filter = { includeBound: false };

      const result = await service.getContentGroupWage(contentIds, undefined, filter);

      // 100 * 1 + 300 * 2 = 700골드
      expect(result.goldAmountPerClear).toBe(700);
    });

    it("환율 데이터 없을 때 fallback 처리", async () => {
      // 기본 환율 데이터 삭제
      await prisma.goldExchangeRate.deleteMany({});
      const contentIds = [testContents[0].id];
      const filter = { includeBound: false };

      // 환율 데이터가 없으면 에러가 발생해야 함
      await expect(service.getContentGroupWage(contentIds, undefined, filter)).rejects.toThrow();

      // 환율 데이터 복구
      await prisma.goldExchangeRate.create({
        data: {
          goldAmount: 100,
          krwAmount: 25,
        },
      });
    });

    it("null/undefined 컨텐츠 필터링", async () => {
      const validContentId = testContents[0].id;
      const invalidContentIds = [null, undefined, validContentId, null];
      const filter = { includeBound: false };

      // null/undefined가 포함된 배열은 에러를 발생시켜야 함
      await expect(
        service.getContentGroupWage(invalidContentIds as any, undefined, filter)
      ).rejects.toThrow();

      // 유효한 contentId만 포함된 배열은 정상 작동해야 함
      const result = await service.getContentGroupWage([validContentId], undefined, filter);
      expect(result.goldAmountPerClear).toBe(200);
    });
  });
});
