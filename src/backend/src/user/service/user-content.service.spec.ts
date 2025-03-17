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

describe('UserContentService', () => {
  let module: TestingModule;
  let prisma: PrismaService;
  let service: UserContentService;
  let userFactory: UserFactory;
  let contentRewardItemFactory: ContentRewardItemFactory;
  let contentFactory: ContentFactory;
  let contentDurationFactory: ContentDurationFactory;

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
  });
});
