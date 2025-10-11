import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "src/prisma";
import { UserContentService } from "../../user/service/user-content.service";
import { CONTEXT } from "@nestjs/graphql";
import { UserGoldExchangeRateService } from "src/user/service/user-gold-exchange-rate.service";
import { User } from "@prisma/client";
import { ContentWageService } from "src/content/service/content-wage.service";
import { UserFactory } from "src/test/factory/user.factory";
import { ItemFactory } from "src/test/factory/item.factory";
import { ContentFactory } from "src/test/factory/content.factory";
import { faker } from "@faker-js/faker/.";
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
        {
          provide: CONTEXT,
          useValue: { req: { user: { id: undefined } } },
        },
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
      const duration = faker.number.int({ min: 1000, max: 10000 });

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

      const averageQuantity = faker.number.float({ min: 1, max: 10000 });

      const contentReward = await prisma.contentReward.create({
        data: {
          contentId: content.id,
          itemId: item.id,
          averageQuantity: averageQuantity,
        },
      });

      const result = await service.getContentRewardAverageQuantity(contentReward.id);
      expect(result.toNumber()).toBe(averageQuantity);
    });

    it("getContentRewards - 기본 동작", async () => {
      const content = await contentFactory.create();
      const item1 = await itemFactory.create();
      const item2 = await itemFactory.create();

      const averageQuantity1 = faker.number.float({ min: 1, max: 10000 });
      const averageQuantity2 = faker.number.float({ min: 1, max: 10000 });

      await prisma.contentReward.createMany({
        data: [
          {
            contentId: content.id,
            itemId: item1.id,
            averageQuantity: averageQuantity1,
            isSellable: true,
          },
          {
            contentId: content.id,
            itemId: item2.id,
            averageQuantity: averageQuantity2,
            isSellable: true,
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

      const averageQuantity1 = faker.number.float({ min: 1, max: 10000 });
      const averageQuantity2 = faker.number.float({ min: 1, max: 10000 });

      await prisma.contentReward.createMany({
        data: [
          {
            contentId: content.id,
            itemId: item1.id,
            averageQuantity: averageQuantity1,
            isSellable: true,
          },
          {
            contentId: content.id,
            itemId: item2.id,
            averageQuantity: averageQuantity2,
            isSellable: false,
          },
        ],
      });

      const results = await service.getContentRewards(content.id, {
        includeIsBound: false,
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

      const averageQuantity1 = faker.number.float({ min: 1, max: 10000 });
      const averageQuantity2 = faker.number.float({ min: 1, max: 10000 });
      const averageQuantity3 = faker.number.float({ min: 1, max: 10000 });

      await prisma.contentReward.createMany({
        data: [
          {
            contentId: content.id,
            itemId: item1.id,
            averageQuantity: averageQuantity1,
            isSellable: true,
          },
          {
            contentId: content.id,
            itemId: item2.id,
            averageQuantity: averageQuantity2,
            isSellable: true,
          },
          {
            contentId: content.id,
            itemId: item3.id,
            averageQuantity: averageQuantity3,
            isSellable: true,
          },
        ],
      });

      const results = await service.getContentRewards(content.id, {
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

      const averageQuantity1 = faker.number.float({ min: 1, max: 10000 });
      const averageQuantity2 = faker.number.float({ min: 1, max: 10000 });
      const averageQuantity3 = faker.number.float({ min: 1, max: 10000 });

      await prisma.contentReward.createMany({
        data: [
          {
            contentId: content.id,
            itemId: item1.id,
            averageQuantity: averageQuantity1,
            isSellable: true,
          },
          {
            contentId: content.id,
            itemId: item2.id,
            averageQuantity: averageQuantity2,
            isSellable: false,
          },
          {
            contentId: content.id,
            itemId: item3.id,
            averageQuantity: averageQuantity3,
            isSellable: true,
          },
        ],
      });

      const results = await service.getContentRewards(content.id, {
        includeIsBound: false,
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
      service["context"].req.user = { id: user.id };
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
          userId: user.id,
          itemId: item.id,
          price: userPrice,
        },
      });

      const result = await service.getItemPrice(item.id);

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

      const result = await service.getItemPrice(item.id);

      expect(result).toBe(price);
    });

    it("getContentDuration", async () => {
      const content = await contentFactory.create();
      await contentDurationFactory.create({
        data: {
          contentId: content.id,
        },
      });
      const duration = faker.number.int({ min: 1000, max: 10000 });

      await prisma.userContentDuration.create({
        data: {
          userId: user.id,
          contentId: content.id,
          value: duration,
        },
      });

      const result = await service.getContentDuration(content.id);
      expect(result).toBe(duration);
    });

    it("getContentRewardAverageQuantity", async () => {
      const averageQuantity = faker.number.float({ min: 1, max: 10000 });

      const contentReward = await contentRewardFactory.create();
      await prisma.userContentReward.create({
        data: {
          userId: user.id,
          contentId: contentReward.contentId,
          itemId: contentReward.itemId,
          averageQuantity,
        },
      });

      const result = await service.getContentRewardAverageQuantity(contentReward.id);

      expect(result.toNumber()).toBeCloseTo(averageQuantity, 5);
    });

    it("getContentRewards - 기본 동작", async () => {
      const content = await contentFactory.create();
      const item1 = await itemFactory.create();
      const item2 = await itemFactory.create();

      const averageQuantity1 = faker.number.float({
        min: 1,
        max: 10000,
      });
      const averageQuantity2 = faker.number.float({
        min: 1,
        max: 10000,
      });

      const userAverageQuantity1 = faker.number.float({ min: 1, max: 10000 });
      const userAverageQuantity2 = faker.number.float({ min: 1, max: 10000 });

      const contentReward1 = await prisma.contentReward.create({
        data: {
          contentId: content.id,
          itemId: item1.id,
          averageQuantity: averageQuantity1,
          isSellable: true,
        },
      });

      const contentReward2 = await prisma.contentReward.create({
        data: {
          contentId: content.id,
          itemId: item2.id,
          averageQuantity: averageQuantity2,
          isSellable: true,
        },
      });

      await prisma.userContentReward.createMany({
        data: [
          {
            userId: user.id,
            contentId: contentReward1.contentId,
            itemId: contentReward1.itemId,
            averageQuantity: userAverageQuantity1,
          },
          {
            userId: user.id,
            contentId: contentReward2.contentId,
            itemId: contentReward2.itemId,
            averageQuantity: userAverageQuantity2,
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

      expect(resultItem1.averageQuantity).toBeCloseTo(userAverageQuantity1, 5);
      expect(resultItem2.averageQuantity).toBeCloseTo(userAverageQuantity2, 5);

      expect(resultItem1.averageQuantity).not.toBeCloseTo(averageQuantity1, 5);
      expect(resultItem2.averageQuantity).not.toBeCloseTo(averageQuantity2, 5);
    });

    it("getContentRewards - isSellable 필터", async () => {
      const content = await contentFactory.create();
      const item1 = await itemFactory.create();
      const item2 = await itemFactory.create();

      const userAverageQuantity1 = faker.number.float({ min: 1, max: 10000 });
      const userAverageQuantity2 = faker.number.float({ min: 1, max: 10000 });

      const contentReward1 = await prisma.contentReward.create({
        data: {
          contentId: content.id,
          itemId: item1.id,
          averageQuantity: faker.number.float({ min: 1, max: 10000 }),
          isSellable: true,
        },
      });

      const contentReward2 = await prisma.contentReward.create({
        data: {
          contentId: content.id,
          itemId: item2.id,
          averageQuantity: faker.number.float({ min: 1, max: 10000 }),
          isSellable: false,
        },
      });

      await prisma.userContentReward.createMany({
        data: [
          {
            userId: user.id,
            contentId: contentReward1.contentId,
            itemId: contentReward1.itemId,
            averageQuantity: userAverageQuantity1,
            isSellable: true,
          },
          {
            userId: user.id,
            contentId: contentReward2.contentId,
            itemId: contentReward2.itemId,
            averageQuantity: userAverageQuantity2,
            isSellable: false,
          },
        ],
      });

      const results = await service.getContentRewards(content.id, {
        includeIsBound: false,
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

      const userAverageQuantity1 = faker.number.float({ min: 1, max: 10000 });
      const userAverageQuantity2 = faker.number.float({ min: 1, max: 10000 });
      const userAverageQuantity3 = faker.number.float({ min: 1, max: 10000 });

      const contentReward1 = await prisma.contentReward.create({
        data: {
          contentId: content.id,
          itemId: item1.id,
          averageQuantity: faker.number.float({ min: 1, max: 10000 }),
          isSellable: true,
        },
      });

      const contentReward2 = await prisma.contentReward.create({
        data: {
          contentId: content.id,
          itemId: item2.id,
          averageQuantity: faker.number.float({ min: 1, max: 10000 }),
          isSellable: true,
        },
      });

      const contentReward3 = await prisma.contentReward.create({
        data: {
          contentId: content.id,
          itemId: item3.id,
          averageQuantity: faker.number.float({ min: 1, max: 10000 }),
          isSellable: true,
        },
      });

      await prisma.userContentReward.createMany({
        data: [
          {
            userId: user.id,
            contentId: contentReward1.contentId,
            itemId: contentReward1.itemId,
            averageQuantity: userAverageQuantity1,
          },
          {
            userId: user.id,
            contentId: contentReward2.contentId,
            itemId: contentReward2.itemId,
            averageQuantity: userAverageQuantity2,
          },
          {
            userId: user.id,
            contentId: contentReward3.contentId,
            itemId: contentReward3.itemId,
            averageQuantity: userAverageQuantity3,
          },
        ],
      });

      const results = await service.getContentRewards(content.id, {
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

      const averageQuantity = faker.number.float({ min: 1, max: 10000 });
      const userAverageQuantity = faker.number.float({ min: 1, max: 10000 });
      const otherUserAverageQuantity = faker.number.float({
        min: 1,
        max: 10000,
      });

      const contentReward = await prisma.contentReward.create({
        data: {
          contentId: content.id,
          itemId: item.id,
          averageQuantity: averageQuantity,
          isSellable: true,
        },
      });

      await prisma.userContentReward.create({
        data: {
          userId: user.id,
          contentId: contentReward.contentId,
          itemId: contentReward.itemId,
          averageQuantity: userAverageQuantity,
        },
      });

      await prisma.userContentReward.create({
        data: {
          userId: otherUser.id,
          contentId: contentReward.contentId,
          itemId: contentReward.itemId,
          averageQuantity: otherUserAverageQuantity,
        },
      });

      const results = await service.getContentRewards(content.id);

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
