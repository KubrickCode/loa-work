import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma';
import { UserContentService } from '../../user/service/user-content.service';
import { CONTEXT } from '@nestjs/graphql';
import { UserGoldExchangeRateService } from 'src/user/service/user-gold-exchange-rate.service';
import { User } from '@prisma/client';
import { ContentWageService } from 'src/content/service/content-wage.service';
import { UserFactory } from 'src/test/factory/user.factory';
import { ContentRewardItemFactory } from 'src/test/factory/content-reward-item.factory';
import { ContentFactory } from 'src/test/factory/content.factory';
import { faker } from '@faker-js/faker/.';
import { ContentDurationFactory } from 'src/test/factory/content-duration.factory';
import { ContentRewardFactory } from 'src/test/factory/content-reward.factory';

describe('UserContentService', () => {
  let module: TestingModule;
  let prisma: PrismaService;
  let service: UserContentService;
  let userFactory: UserFactory;
  let contentRewardItemFactory: ContentRewardItemFactory;
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
        ContentRewardItemFactory,
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
    contentRewardItemFactory = module.get(ContentRewardItemFactory);
    contentFactory = module.get(ContentFactory);
    contentDurationFactory = module.get(ContentDurationFactory);
    contentRewardFactory = module.get(ContentRewardFactory);
  });

  afterAll(async () => {
    await module.close();
  });

  describe('not logged in', () => {
    it('getContentRewardItemPrice', async () => {
      const price = 100;

      const contentRewardItem = await contentRewardItemFactory.create({
        data: {
          price,
        },
      });

      const result = await service.getContentRewardItemPrice(
        contentRewardItem.id,
      );

      expect(result).toBe(price);
    });

    it('getContentDuration', async () => {
      const content = await contentFactory.create();
      const duration = faker.number.int({ min: 1000, max: 10000 });

      await prisma.contentDuration.create({
        data: {
          contentId: content.id,
          defaultValue: duration,
        },
      });

      const result = await service.getContentDuration(content.id);
      expect(result).toBe(duration);
    });

    it('getContentRewardAverageQuantity', async () => {
      const content = await contentFactory.create();
      const contentRewardItem = await contentRewardItemFactory.create();

      const averageQuantity = faker.number.float({ min: 1, max: 10000 });

      const contentReward = await prisma.contentReward.create({
        data: {
          contentId: content.id,
          contentRewardItemId: contentRewardItem.id,
          defaultAverageQuantity: averageQuantity,
        },
      });

      const result = await service.getContentRewardAverageQuantity(
        contentReward.id,
      );
      expect(result.toNumber()).toBe(averageQuantity);
    });

    it('getContentRewards - 기본 동작', async () => {
      const content = await contentFactory.create();
      const contentRewardItem1 = await contentRewardItemFactory.create();
      const contentRewardItem2 = await contentRewardItemFactory.create();

      const averageQuantity1 = faker.number.float({ min: 1, max: 10000 });
      const averageQuantity2 = faker.number.float({ min: 1, max: 10000 });

      await prisma.contentReward.createMany({
        data: [
          {
            contentId: content.id,
            contentRewardItemId: contentRewardItem1.id,
            defaultAverageQuantity: averageQuantity1,
            isSellable: true,
          },
          {
            contentId: content.id,
            contentRewardItemId: contentRewardItem2.id,
            defaultAverageQuantity: averageQuantity2,
            isSellable: true,
          },
        ],
      });

      const results = await service.getContentRewards(content.id);

      expect(results).toHaveLength(2);

      const resultItemIds = results.map((r) => r.contentRewardItemId);
      expect(resultItemIds).toContain(contentRewardItem1.id);
      expect(resultItemIds).toContain(contentRewardItem2.id);

      const resultItem1 = results.find(
        (r) => r.contentRewardItemId === contentRewardItem1.id,
      );
      const resultItem2 = results.find(
        (r) => r.contentRewardItemId === contentRewardItem2.id,
      );

      expect(resultItem1.averageQuantity).toBeCloseTo(averageQuantity1, 5);
      expect(resultItem2.averageQuantity).toBeCloseTo(averageQuantity2, 5);
    });

    it('getContentRewards - isSellable 필터', async () => {
      const content = await contentFactory.create();
      const contentRewardItem1 = await contentRewardItemFactory.create();
      const contentRewardItem2 = await contentRewardItemFactory.create();

      const averageQuantity1 = faker.number.float({ min: 1, max: 10000 });
      const averageQuantity2 = faker.number.float({ min: 1, max: 10000 });

      await prisma.contentReward.createMany({
        data: [
          {
            contentId: content.id,
            contentRewardItemId: contentRewardItem1.id,
            defaultAverageQuantity: averageQuantity1,
            isSellable: true,
          },
          {
            contentId: content.id,
            contentRewardItemId: contentRewardItem2.id,
            defaultAverageQuantity: averageQuantity2,
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
          contentRewardItemId: contentRewardItem1.id,
        }),
      );
    });

    it('getContentRewards - contentRewardItemIds 필터', async () => {
      const content = await contentFactory.create();
      const contentRewardItem1 = await contentRewardItemFactory.create();
      const contentRewardItem2 = await contentRewardItemFactory.create();
      const contentRewardItem3 = await contentRewardItemFactory.create();

      const averageQuantity1 = faker.number.float({ min: 1, max: 10000 });
      const averageQuantity2 = faker.number.float({ min: 1, max: 10000 });
      const averageQuantity3 = faker.number.float({ min: 1, max: 10000 });

      await prisma.contentReward.createMany({
        data: [
          {
            contentId: content.id,
            contentRewardItemId: contentRewardItem1.id,
            defaultAverageQuantity: averageQuantity1,
            isSellable: true,
          },
          {
            contentId: content.id,
            contentRewardItemId: contentRewardItem2.id,
            defaultAverageQuantity: averageQuantity2,
            isSellable: true,
          },
          {
            contentId: content.id,
            contentRewardItemId: contentRewardItem3.id,
            defaultAverageQuantity: averageQuantity3,
            isSellable: true,
          },
        ],
      });

      const results = await service.getContentRewards(content.id, {
        includeContentRewardItemIds: [
          contentRewardItem1.id,
          contentRewardItem3.id,
        ],
      });

      expect(results).toHaveLength(2);

      const resultItemIds = results.map((r) => r.contentRewardItemId);
      expect(resultItemIds).toContain(contentRewardItem1.id);
      expect(resultItemIds).toContain(contentRewardItem3.id);
      expect(resultItemIds).not.toContain(contentRewardItem2.id);

      const resultItem1 = results.find(
        (r) => r.contentRewardItemId === contentRewardItem1.id,
      );
      const resultItem3 = results.find(
        (r) => r.contentRewardItemId === contentRewardItem3.id,
      );

      expect(resultItem1.averageQuantity).toBeCloseTo(averageQuantity1, 5);
      expect(resultItem3.averageQuantity).toBeCloseTo(averageQuantity3, 5);
    });

    it('getContentRewards - 여러 필터 조합', async () => {
      const content = await contentFactory.create();
      const contentRewardItem1 = await contentRewardItemFactory.create();
      const contentRewardItem2 = await contentRewardItemFactory.create();
      const contentRewardItem3 = await contentRewardItemFactory.create();

      const averageQuantity1 = faker.number.float({ min: 1, max: 10000 });
      const averageQuantity2 = faker.number.float({ min: 1, max: 10000 });
      const averageQuantity3 = faker.number.float({ min: 1, max: 10000 });

      await prisma.contentReward.createMany({
        data: [
          {
            contentId: content.id,
            contentRewardItemId: contentRewardItem1.id,
            defaultAverageQuantity: averageQuantity1,
            isSellable: true,
          },
          {
            contentId: content.id,
            contentRewardItemId: contentRewardItem2.id,
            defaultAverageQuantity: averageQuantity2,
            isSellable: false,
          },
          {
            contentId: content.id,
            contentRewardItemId: contentRewardItem3.id,
            defaultAverageQuantity: averageQuantity3,
            isSellable: true,
          },
        ],
      });

      const results = await service.getContentRewards(content.id, {
        includeIsBound: false,
        includeContentRewardItemIds: [
          contentRewardItem1.id,
          contentRewardItem2.id,
        ],
      });

      expect(results).toHaveLength(1);
      expect(results[0]).toEqual(
        expect.objectContaining({
          averageQuantity: averageQuantity1,
          contentRewardItemId: contentRewardItem1.id,
        }),
      );
    });

    it('getContentRewards - 빈 결과 반환', async () => {
      const content = await contentFactory.create();

      const results = await service.getContentRewards(content.id);

      expect(results).toHaveLength(0);
      expect(results).toEqual([]);
    });
  });

  describe('logged in', () => {
    let user: User;

    beforeAll(async () => {
      user = await userFactory.create();
      service['context'].req.user = { id: user.id };
    });

    it('getContentRewardItemPrice', async () => {
      const contentRewardItem = await contentRewardItemFactory.create({
        data: {
          isEditable: true,
          price: 100,
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

      const result = await service.getContentRewardItemPrice(
        contentRewardItem.id,
      );

      expect(result).toBe(userPrice);
    });

    it('getContentRewardItemPrice - not editable', async () => {
      const price = 100;
      const contentRewardItem = await contentRewardItemFactory.create({
        data: {
          isEditable: false,
          price,
        },
      });

      const result = await service.getContentRewardItemPrice(
        contentRewardItem.id,
      );

      expect(result).toBe(price);
    });

    it('getContentDuration', async () => {
      const content = await contentFactory.create();
      const contentDuration = await contentDurationFactory.create({
        data: {
          contentId: content.id,
        },
      });
      const duration = faker.number.int({ min: 1000, max: 10000 });

      await prisma.userContentDuration.create({
        data: {
          userId: user.id,
          contentDurationId: contentDuration.id,
          value: duration,
        },
      });

      const result = await service.getContentDuration(content.id);
      expect(result).toBe(duration);
    });

    it('getContentRewardAverageQuantity', async () => {
      const averageQuantity = faker.number.float({ min: 1, max: 10000 });

      const contentReward = await contentRewardFactory.create();
      await prisma.userContentReward.create({
        data: {
          userId: user.id,
          contentRewardId: contentReward.id,
          averageQuantity,
        },
      });

      const result = await service.getContentRewardAverageQuantity(
        contentReward.id,
      );

      expect(result.toNumber()).toBeCloseTo(averageQuantity, 5);
    });

    it('getContentRewards - 기본 동작', async () => {
      const content = await contentFactory.create();
      const contentRewardItem1 = await contentRewardItemFactory.create();
      const contentRewardItem2 = await contentRewardItemFactory.create();

      const defaultAverageQuantity1 = faker.number.float({
        min: 1,
        max: 10000,
      });
      const defaultAverageQuantity2 = faker.number.float({
        min: 1,
        max: 10000,
      });

      const userAverageQuantity1 = faker.number.float({ min: 1, max: 10000 });
      const userAverageQuantity2 = faker.number.float({ min: 1, max: 10000 });

      const contentReward1 = await prisma.contentReward.create({
        data: {
          contentId: content.id,
          contentRewardItemId: contentRewardItem1.id,
          defaultAverageQuantity: defaultAverageQuantity1,
          isSellable: true,
        },
      });

      const contentReward2 = await prisma.contentReward.create({
        data: {
          contentId: content.id,
          contentRewardItemId: contentRewardItem2.id,
          defaultAverageQuantity: defaultAverageQuantity2,
          isSellable: true,
        },
      });

      await prisma.userContentReward.createMany({
        data: [
          {
            userId: user.id,
            contentRewardId: contentReward1.id,
            averageQuantity: userAverageQuantity1,
          },
          {
            userId: user.id,
            contentRewardId: contentReward2.id,
            averageQuantity: userAverageQuantity2,
          },
        ],
      });

      const results = await service.getContentRewards(content.id);

      expect(results).toHaveLength(2);

      const resultItemIds = results.map((r) => r.contentRewardItemId);
      expect(resultItemIds).toContain(contentRewardItem1.id);
      expect(resultItemIds).toContain(contentRewardItem2.id);

      const resultItem1 = results.find(
        (r) => r.contentRewardItemId === contentRewardItem1.id,
      );
      const resultItem2 = results.find(
        (r) => r.contentRewardItemId === contentRewardItem2.id,
      );

      expect(resultItem1.averageQuantity).toBeCloseTo(userAverageQuantity1, 5);
      expect(resultItem2.averageQuantity).toBeCloseTo(userAverageQuantity2, 5);

      expect(resultItem1.averageQuantity).not.toBeCloseTo(
        defaultAverageQuantity1,
        5,
      );
      expect(resultItem2.averageQuantity).not.toBeCloseTo(
        defaultAverageQuantity2,
        5,
      );
    });

    it('getContentRewards - isSellable 필터', async () => {
      const content = await contentFactory.create();
      const contentRewardItem1 = await contentRewardItemFactory.create();
      const contentRewardItem2 = await contentRewardItemFactory.create();

      const userAverageQuantity1 = faker.number.float({ min: 1, max: 10000 });
      const userAverageQuantity2 = faker.number.float({ min: 1, max: 10000 });

      const contentReward1 = await prisma.contentReward.create({
        data: {
          contentId: content.id,
          contentRewardItemId: contentRewardItem1.id,
          defaultAverageQuantity: faker.number.float({ min: 1, max: 10000 }),
          isSellable: true,
        },
      });

      const contentReward2 = await prisma.contentReward.create({
        data: {
          contentId: content.id,
          contentRewardItemId: contentRewardItem2.id,
          defaultAverageQuantity: faker.number.float({ min: 1, max: 10000 }),
          isSellable: false,
        },
      });

      await prisma.userContentReward.createMany({
        data: [
          {
            userId: user.id,
            contentRewardId: contentReward1.id,
            averageQuantity: userAverageQuantity1,
          },
          {
            userId: user.id,
            contentRewardId: contentReward2.id,
            averageQuantity: userAverageQuantity2,
          },
        ],
      });

      const results = await service.getContentRewards(content.id, {
        includeIsBound: false,
      });

      expect(results).toHaveLength(1);
      expect(results[0].contentRewardItemId).toBe(contentRewardItem1.id);
      expect(results[0].averageQuantity).toBeCloseTo(userAverageQuantity1, 5);
    });

    it('getContentRewards - contentRewardItemIds 필터', async () => {
      const content = await contentFactory.create();
      const contentRewardItem1 = await contentRewardItemFactory.create();
      const contentRewardItem2 = await contentRewardItemFactory.create();
      const contentRewardItem3 = await contentRewardItemFactory.create();

      const userAverageQuantity1 = faker.number.float({ min: 1, max: 10000 });
      const userAverageQuantity2 = faker.number.float({ min: 1, max: 10000 });
      const userAverageQuantity3 = faker.number.float({ min: 1, max: 10000 });

      const contentReward1 = await prisma.contentReward.create({
        data: {
          contentId: content.id,
          contentRewardItemId: contentRewardItem1.id,
          defaultAverageQuantity: faker.number.float({ min: 1, max: 10000 }),
          isSellable: true,
        },
      });

      const contentReward2 = await prisma.contentReward.create({
        data: {
          contentId: content.id,
          contentRewardItemId: contentRewardItem2.id,
          defaultAverageQuantity: faker.number.float({ min: 1, max: 10000 }),
          isSellable: true,
        },
      });

      const contentReward3 = await prisma.contentReward.create({
        data: {
          contentId: content.id,
          contentRewardItemId: contentRewardItem3.id,
          defaultAverageQuantity: faker.number.float({ min: 1, max: 10000 }),
          isSellable: true,
        },
      });

      await prisma.userContentReward.createMany({
        data: [
          {
            userId: user.id,
            contentRewardId: contentReward1.id,
            averageQuantity: userAverageQuantity1,
          },
          {
            userId: user.id,
            contentRewardId: contentReward2.id,
            averageQuantity: userAverageQuantity2,
          },
          {
            userId: user.id,
            contentRewardId: contentReward3.id,
            averageQuantity: userAverageQuantity3,
          },
        ],
      });

      const results = await service.getContentRewards(content.id, {
        includeContentRewardItemIds: [
          contentRewardItem1.id,
          contentRewardItem3.id,
        ],
      });

      expect(results).toHaveLength(2);

      const resultItemIds = results.map((r) => r.contentRewardItemId);
      expect(resultItemIds).toContain(contentRewardItem1.id);
      expect(resultItemIds).toContain(contentRewardItem3.id);
      expect(resultItemIds).not.toContain(contentRewardItem2.id);

      const resultItem1 = results.find(
        (r) => r.contentRewardItemId === contentRewardItem1.id,
      );
      const resultItem3 = results.find(
        (r) => r.contentRewardItemId === contentRewardItem3.id,
      );

      expect(resultItem1.averageQuantity).toBeCloseTo(userAverageQuantity1, 5);
      expect(resultItem3.averageQuantity).toBeCloseTo(userAverageQuantity3, 5);
    });

    it('getContentRewards - 다른 사용자의 리워드는 반환되지 않음', async () => {
      const otherUser = await userFactory.create();

      const content = await contentFactory.create();
      const contentRewardItem = await contentRewardItemFactory.create();

      const defaultAverageQuantity = faker.number.float({ min: 1, max: 10000 });
      const userAverageQuantity = faker.number.float({ min: 1, max: 10000 });
      const otherUserAverageQuantity = faker.number.float({
        min: 1,
        max: 10000,
      });

      const contentReward = await prisma.contentReward.create({
        data: {
          contentId: content.id,
          contentRewardItemId: contentRewardItem.id,
          defaultAverageQuantity: defaultAverageQuantity,
          isSellable: true,
        },
      });

      await prisma.userContentReward.create({
        data: {
          userId: user.id,
          contentRewardId: contentReward.id,
          averageQuantity: userAverageQuantity,
        },
      });

      await prisma.userContentReward.create({
        data: {
          userId: otherUser.id,
          contentRewardId: contentReward.id,
          averageQuantity: otherUserAverageQuantity,
        },
      });

      const results = await service.getContentRewards(content.id);

      expect(results).toHaveLength(1);
      expect(results[0].contentRewardItemId).toBe(contentRewardItem.id);

      expect(results[0].averageQuantity).toBeCloseTo(userAverageQuantity, 5);
      expect(results[0].averageQuantity).not.toBeCloseTo(
        otherUserAverageQuantity,
        5,
      );
      expect(results[0].averageQuantity).not.toBeCloseTo(
        defaultAverageQuantity,
        5,
      );
    });

    it('getContentRewards - 존재하지 않는 사용자 리워드는 빈 배열 반환', async () => {
      const content = await contentFactory.create();

      const results = await service.getContentRewards(content.id);

      expect(results).toHaveLength(0);
      expect(results).toEqual([]);
    });
  });
});
