import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma';
import { UserContentService } from '../../user/service/user-content.service';
import { CONTEXT } from '@nestjs/graphql';
import { UserGoldExchangeRateService } from 'src/user/service/user-gold-exchange-rate.service';
import { faker } from '@faker-js/faker/.';
import { ContentRewardItemKind, User } from '@prisma/client';
import { ContentWageService } from 'src/content/service/content-wage.service';
import { UserFactory } from 'src/test/factory/user.factory';

describe('UserContentService', () => {
  let module: TestingModule;
  let prisma: PrismaService;
  let service: UserContentService;
  let userFactory: UserFactory;

  beforeAll(async () => {
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

    prisma = module.get(PrismaService);
    service = module.get(UserContentService);
    userFactory = module.get(UserFactory);
  });

  afterAll(async () => {
    await module.close();
  });

  describe('not logged in', () => {
    it('getContentRewardItemPrice', async () => {
      const price = 100;

      const contentRewardItem = await prisma.contentRewardItem.create({
        data: {
          name: faker.lorem.word(),
          kind: ContentRewardItemKind.MARKET_ITEM,
          imageUrl: faker.image.url(),
          price,
        },
      });

      const result = await service.getContentRewardItemPrice(
        contentRewardItem.id,
      );

      expect(result).toBe(price);
    });
  });

  describe('logged in', () => {
    let user: User;

    beforeAll(async () => {
      user = await userFactory.create();
      service['context'].req.user = { id: user.id };
    });

    it('getContentRewardItemPrice', async () => {
      const contentRewardItem = await prisma.contentRewardItem.create({
        data: {
          name: faker.lorem.word(),
          kind: ContentRewardItemKind.MARKET_ITEM,
          imageUrl: faker.image.url(),
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
      const contentRewardItem = await prisma.contentRewardItem.create({
        data: {
          name: faker.lorem.word(),
          kind: ContentRewardItemKind.MARKET_ITEM,
          imageUrl: faker.image.url(),
          isEditable: false,
          price,
        },
      });

      const result = await service.getContentRewardItemPrice(
        contentRewardItem.id,
      );

      expect(result).toBe(price);
    });
  });
});
