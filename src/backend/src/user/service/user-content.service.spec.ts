import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "src/prisma";
import { UserContentService } from "../../user/service/user-content.service";
import { UserGoldExchangeRateService } from "src/user/service/user-gold-exchange-rate.service";
import { User } from "@prisma/client";
import { ContentWageService } from "src/content/wage/wage.service";
import { UserFactory } from "src/test/factory/user.factory";
import { ItemFactory } from "src/test/factory/item.factory";
import { ContentFactory } from "src/test/factory/content.factory";
import { faker } from "@faker-js/faker";
import { ContentDurationFactory } from "src/test/factory/content-duration.factory";
import { ContentRewardFactory } from "src/test/factory/content-reward.factory";

describe("UserContentService", () => {
  let module: TestingModule;
  let prisma: PrismaService;
  let service: UserContentService;
  let userFactory: UserFactory;
  let itemFactory: ItemFactory;
  let contentFactory: ContentFactory;
  let contentDurationFactory: ContentDurationFactory;
  let contentRewardFactory: ContentRewardFactory;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        PrismaService,
        ContentWageService,
        UserContentService,
        UserGoldExchangeRateService,
        UserFactory,
        ItemFactory,
        ContentFactory,
        ContentDurationFactory,
        ContentRewardFactory,
      ],
    }).compile();

    prisma = module.get(PrismaService);
    service = module.get(UserContentService);
    userFactory = module.get(UserFactory);
    itemFactory = module.get(ItemFactory);
    contentFactory = module.get(ContentFactory);
    contentDurationFactory = module.get(ContentDurationFactory);
    contentRewardFactory = module.get(ContentRewardFactory);
  });

  afterAll(async () => {
    await module.close();
  });

  describe("not logged in", () => {
    it("getItemPrice", async () => {
      const price = 100;

      const item = await itemFactory.create({
        data: {
          price,
        },
      });

      const result = await service.getItemPrice(item.id);

      expect(result).toBe(price);
    });

    it("getContentDuration", async () => {
      const content = await contentFactory.create();
      const duration = faker.number.int({ max: 10000, min: 1000 });

      await prisma.contentDuration.create({
        data: {
          contentId: content.id,
          value: duration,
        },
      });

      const result = await service.getContentDuration(content.id);
      expect(result).toBe(duration);
    });

    it("getContentRewardAverageQuantity", async () => {
      const content = await contentFactory.create();
      const item = await itemFactory.create();

      const averageQuantity = faker.number.float({ max: 10000, min: 1 });

      const contentReward = await prisma.contentReward.create({
        data: {
          averageQuantity: averageQuantity,
          contentId: content.id,
          itemId: item.id,
        },
      });

      const result = await service.getContentRewardAverageQuantity(contentReward.id);
      expect(result.toNumber()).toBe(averageQuantity);
    });

    it("getContentRewards - 기본 동작", async () => {
      const content = await contentFactory.create();
      const item1 = await itemFactory.create();
      const item2 = await itemFactory.create();

      const averageQuantity1 = faker.number.float({ max: 10000, min: 1 });
      const averageQuantity2 = faker.number.float({ max: 10000, min: 1 });

      await prisma.contentReward.createMany({
        data: [
          {
            averageQuantity: averageQuantity1,
            contentId: content.id,
            isSellable: true,
            itemId: item1.id,
          },
          {
            averageQuantity: averageQuantity2,
            contentId: content.id,
            isSellable: true,
            itemId: item2.id,
          },
        ],
      });

      const results = await service.getContentRewards(content.id);

      expect(results).toHaveLength(2);

      const resultItemIds = results.map((r) => r.itemId);
      expect(resultItemIds).toContain(item1.id);
      expect(resultItemIds).toContain(item2.id);

      const resultItem1 = results.find((r) => r.itemId === item1.id);
      const resultItem2 = results.find((r) => r.itemId === item2.id);

      expect(resultItem1.averageQuantity).toBeCloseTo(averageQuantity1, 5);
      expect(resultItem2.averageQuantity).toBeCloseTo(averageQuantity2, 5);
    });

    it("getContentRewards - isSellable 필터", async () => {
      const content = await contentFactory.create();
      const item1 = await itemFactory.create();
      const item2 = await itemFactory.create();

      const averageQuantity1 = faker.number.float({ max: 10000, min: 1 });
      const averageQuantity2 = faker.number.float({ max: 10000, min: 1 });

      await prisma.contentReward.createMany({
        data: [
          {
            averageQuantity: averageQuantity1,
            contentId: content.id,
            isSellable: true,
            itemId: item1.id,
          },
          {
            averageQuantity: averageQuantity2,
            contentId: content.id,
            isSellable: false,
            itemId: item2.id,
          },
        ],
      });

      const results = await service.getContentRewards(content.id, undefined, {
        includeBound: false,
      });

      expect(results).toHaveLength(1);
      expect(results[0]).toEqual(
        expect.objectContaining({
          averageQuantity: averageQuantity1,
          itemId: item1.id,
        })
      );
    });

    it("getContentRewards - itemIds 필터", async () => {
      const content = await contentFactory.create();
      const item1 = await itemFactory.create();
      const item2 = await itemFactory.create();
      const item3 = await itemFactory.create();

      const averageQuantity1 = faker.number.float({ max: 10000, min: 1 });
      const averageQuantity2 = faker.number.float({ max: 10000, min: 1 });
      const averageQuantity3 = faker.number.float({ max: 10000, min: 1 });

      await prisma.contentReward.createMany({
        data: [
          {
            averageQuantity: averageQuantity1,
            contentId: content.id,
            isSellable: true,
            itemId: item1.id,
          },
          {
            averageQuantity: averageQuantity2,
            contentId: content.id,
            isSellable: true,
            itemId: item2.id,
          },
          {
            averageQuantity: averageQuantity3,
            contentId: content.id,
            isSellable: true,
            itemId: item3.id,
          },
        ],
      });

      const results = await service.getContentRewards(content.id, undefined, {
        includeItemIds: [item1.id, item3.id],
      });

      expect(results).toHaveLength(2);

      const resultItemIds = results.map((r) => r.itemId);
      expect(resultItemIds).toContain(item1.id);
      expect(resultItemIds).toContain(item3.id);
      expect(resultItemIds).not.toContain(item2.id);

      const resultItem1 = results.find((r) => r.itemId === item1.id);
      const resultItem3 = results.find((r) => r.itemId === item3.id);

      expect(resultItem1.averageQuantity).toBeCloseTo(averageQuantity1, 5);
      expect(resultItem3.averageQuantity).toBeCloseTo(averageQuantity3, 5);
    });

    it("getContentRewards - 여러 필터 조합", async () => {
      const content = await contentFactory.create();
      const item1 = await itemFactory.create();
      const item2 = await itemFactory.create();
      const item3 = await itemFactory.create();

      const averageQuantity1 = faker.number.float({ max: 10000, min: 1 });
      const averageQuantity2 = faker.number.float({ max: 10000, min: 1 });
      const averageQuantity3 = faker.number.float({ max: 10000, min: 1 });

      await prisma.contentReward.createMany({
        data: [
          {
            averageQuantity: averageQuantity1,
            contentId: content.id,
            isSellable: true,
            itemId: item1.id,
          },
          {
            averageQuantity: averageQuantity2,
            contentId: content.id,
            isSellable: false,
            itemId: item2.id,
          },
          {
            averageQuantity: averageQuantity3,
            contentId: content.id,
            isSellable: true,
            itemId: item3.id,
          },
        ],
      });

      const results = await service.getContentRewards(content.id, undefined, {
        includeBound: false,
        includeItemIds: [item1.id, item2.id],
      });

      expect(results).toHaveLength(1);
      expect(results[0]).toEqual(
        expect.objectContaining({
          averageQuantity: averageQuantity1,
          itemId: item1.id,
        })
      );
    });

    it("getContentRewards - 빈 결과 반환", async () => {
      const content = await contentFactory.create();

      const results = await service.getContentRewards(content.id);

      expect(results).toHaveLength(0);
      expect(results).toEqual([]);
    });
  });

  describe("logged in", () => {
    let user: User;

    beforeAll(async () => {
      user = await userFactory.create();
    });

    it("getItemPrice", async () => {
      const item = await itemFactory.create({
        data: {
          isEditable: true,
          price: 100,
        },
      });

      const userPrice = 250;
      await prisma.userItem.create({
        data: {
          itemId: item.id,
          price: userPrice,
          userId: user.id,
        },
      });

      const result = await service.getItemPrice(item.id, user.id);

      expect(result).toBe(userPrice);
    });

    it("getItemPrice - not editable", async () => {
      const price = 100;
      const item = await itemFactory.create({
        data: {
          isEditable: false,
          price,
        },
      });

      const result = await service.getItemPrice(item.id, user.id);

      expect(result).toBe(price);
    });

    it("getContentDuration", async () => {
      const content = await contentFactory.create();
      await contentDurationFactory.create({
        data: {
          contentId: content.id,
        },
      });
      const duration = faker.number.int({ max: 10000, min: 1000 });

      await prisma.userContentDuration.create({
        data: {
          contentId: content.id,
          userId: user.id,
          value: duration,
        },
      });

      const result = await service.getContentDuration(content.id, user.id);
      expect(result).toBe(duration);
    });

    it("getContentRewardAverageQuantity", async () => {
      const averageQuantity = faker.number.float({ max: 10000, min: 1 });

      const contentReward = await contentRewardFactory.create();
      await prisma.userContentReward.create({
        data: {
          averageQuantity,
          contentId: contentReward.contentId,
          itemId: contentReward.itemId,
          userId: user.id,
        },
      });

      const result = await service.getContentRewardAverageQuantity(contentReward.id, user.id);

      expect(result.toNumber()).toBeCloseTo(averageQuantity, 5);
    });

    it("getContentRewards - 기본 동작", async () => {
      const content = await contentFactory.create();
      const item1 = await itemFactory.create();
      const item2 = await itemFactory.create();

      const averageQuantity1 = faker.number.float({
        max: 10000,
        min: 1,
      });
      const averageQuantity2 = faker.number.float({
        max: 10000,
        min: 1,
      });

      const userAverageQuantity1 = faker.number.float({ max: 10000, min: 1 });
      const userAverageQuantity2 = faker.number.float({ max: 10000, min: 1 });

      const contentReward1 = await prisma.contentReward.create({
        data: {
          averageQuantity: averageQuantity1,
          contentId: content.id,
          isSellable: true,
          itemId: item1.id,
        },
      });

      const contentReward2 = await prisma.contentReward.create({
        data: {
          averageQuantity: averageQuantity2,
          contentId: content.id,
          isSellable: true,
          itemId: item2.id,
        },
      });

      await prisma.userContentReward.createMany({
        data: [
          {
            averageQuantity: userAverageQuantity1,
            contentId: contentReward1.contentId,
            itemId: contentReward1.itemId,
            userId: user.id,
          },
          {
            averageQuantity: userAverageQuantity2,
            contentId: contentReward2.contentId,
            itemId: contentReward2.itemId,
            userId: user.id,
          },
        ],
      });

      const results = await service.getContentRewards(content.id, user.id);

      expect(results).toHaveLength(2);

      const resultItemIds = results.map((r) => r.itemId);
      expect(resultItemIds).toContain(item1.id);
      expect(resultItemIds).toContain(item2.id);

      const resultItem1 = results.find((r) => r.itemId === item1.id);
      const resultItem2 = results.find((r) => r.itemId === item2.id);

      expect(resultItem1.averageQuantity).toBeCloseTo(userAverageQuantity1, 5);
      expect(resultItem2.averageQuantity).toBeCloseTo(userAverageQuantity2, 5);

      expect(resultItem1.averageQuantity).not.toBeCloseTo(averageQuantity1, 5);
      expect(resultItem2.averageQuantity).not.toBeCloseTo(averageQuantity2, 5);
    });

    it("getContentRewards - isSellable 필터", async () => {
      const content = await contentFactory.create();
      const item1 = await itemFactory.create();
      const item2 = await itemFactory.create();

      const userAverageQuantity1 = faker.number.float({ max: 10000, min: 1 });
      const userAverageQuantity2 = faker.number.float({ max: 10000, min: 1 });

      const contentReward1 = await prisma.contentReward.create({
        data: {
          averageQuantity: faker.number.float({ max: 10000, min: 1 }),
          contentId: content.id,
          isSellable: true,
          itemId: item1.id,
        },
      });

      const contentReward2 = await prisma.contentReward.create({
        data: {
          averageQuantity: faker.number.float({ max: 10000, min: 1 }),
          contentId: content.id,
          isSellable: false,
          itemId: item2.id,
        },
      });

      await prisma.userContentReward.createMany({
        data: [
          {
            averageQuantity: userAverageQuantity1,
            contentId: contentReward1.contentId,
            isSellable: true,
            itemId: contentReward1.itemId,
            userId: user.id,
          },
          {
            averageQuantity: userAverageQuantity2,
            contentId: contentReward2.contentId,
            isSellable: false,
            itemId: contentReward2.itemId,
            userId: user.id,
          },
        ],
      });

      const results = await service.getContentRewards(content.id, user.id, {
        includeBound: false,
      });

      expect(results).toHaveLength(1);
      expect(results[0].itemId).toBe(item1.id);
      expect(results[0].averageQuantity).toBeCloseTo(userAverageQuantity1, 5);
    });

    it("getContentRewards - itemIds 필터", async () => {
      const content = await contentFactory.create();
      const item1 = await itemFactory.create();
      const item2 = await itemFactory.create();
      const item3 = await itemFactory.create();

      const userAverageQuantity1 = faker.number.float({ max: 10000, min: 1 });
      const userAverageQuantity2 = faker.number.float({ max: 10000, min: 1 });
      const userAverageQuantity3 = faker.number.float({ max: 10000, min: 1 });

      const contentReward1 = await prisma.contentReward.create({
        data: {
          averageQuantity: faker.number.float({ max: 10000, min: 1 }),
          contentId: content.id,
          isSellable: true,
          itemId: item1.id,
        },
      });

      const contentReward2 = await prisma.contentReward.create({
        data: {
          averageQuantity: faker.number.float({ max: 10000, min: 1 }),
          contentId: content.id,
          isSellable: true,
          itemId: item2.id,
        },
      });

      const contentReward3 = await prisma.contentReward.create({
        data: {
          averageQuantity: faker.number.float({ max: 10000, min: 1 }),
          contentId: content.id,
          isSellable: true,
          itemId: item3.id,
        },
      });

      await prisma.userContentReward.createMany({
        data: [
          {
            averageQuantity: userAverageQuantity1,
            contentId: contentReward1.contentId,
            itemId: contentReward1.itemId,
            userId: user.id,
          },
          {
            averageQuantity: userAverageQuantity2,
            contentId: contentReward2.contentId,
            itemId: contentReward2.itemId,
            userId: user.id,
          },
          {
            averageQuantity: userAverageQuantity3,
            contentId: contentReward3.contentId,
            itemId: contentReward3.itemId,
            userId: user.id,
          },
        ],
      });

      const results = await service.getContentRewards(content.id, user.id, {
        includeItemIds: [item1.id, item3.id],
      });

      expect(results).toHaveLength(2);

      const resultItemIds = results.map((r) => r.itemId);
      expect(resultItemIds).toContain(item1.id);
      expect(resultItemIds).toContain(item3.id);
      expect(resultItemIds).not.toContain(item2.id);

      const resultItem1 = results.find((r) => r.itemId === item1.id);
      const resultItem3 = results.find((r) => r.itemId === item3.id);

      expect(resultItem1.averageQuantity).toBeCloseTo(userAverageQuantity1, 5);
      expect(resultItem3.averageQuantity).toBeCloseTo(userAverageQuantity3, 5);
    });

    it("getContentRewards - 다른 사용자의 리워드는 반환되지 않음", async () => {
      const otherUser = await userFactory.create();

      const content = await contentFactory.create();
      const item = await itemFactory.create();

      const averageQuantity = faker.number.float({ max: 10000, min: 1 });
      const userAverageQuantity = faker.number.float({ max: 10000, min: 1 });
      const otherUserAverageQuantity = faker.number.float({
        max: 10000,
        min: 1,
      });

      const contentReward = await prisma.contentReward.create({
        data: {
          averageQuantity: averageQuantity,
          contentId: content.id,
          isSellable: true,
          itemId: item.id,
        },
      });

      await prisma.userContentReward.create({
        data: {
          averageQuantity: userAverageQuantity,
          contentId: contentReward.contentId,
          itemId: contentReward.itemId,
          userId: user.id,
        },
      });

      await prisma.userContentReward.create({
        data: {
          averageQuantity: otherUserAverageQuantity,
          contentId: contentReward.contentId,
          itemId: contentReward.itemId,
          userId: otherUser.id,
        },
      });

      const results = await service.getContentRewards(content.id, user.id);

      expect(results).toHaveLength(1);
      expect(results[0].itemId).toBe(item.id);

      expect(results[0].averageQuantity).toBeCloseTo(userAverageQuantity, 5);
      expect(results[0].averageQuantity).not.toBeCloseTo(otherUserAverageQuantity, 5);
      expect(results[0].averageQuantity).not.toBeCloseTo(averageQuantity, 5);
    });

    it("getContentRewards - 존재하지 않는 사용자 리워드는 빈 배열 반환", async () => {
      const content = await contentFactory.create();

      const results = await service.getContentRewards(content.id);

      expect(results).toHaveLength(0);
      expect(results).toEqual([]);
    });
  });
});
