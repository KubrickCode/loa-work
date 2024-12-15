import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma';
import { ContentWageService } from './content-wage.service';
import { UserContentService } from '../../user/service/user-content.service';
import { CONTEXT } from '@nestjs/graphql';
import { UserGoldExchangeRateService } from 'src/user/service/user-gold-exchange-rate.service';
import { User } from '@prisma/client';
import { UserFactory } from 'src/test/factory/user.factory';
import { ContextType } from 'src/user/service/types';

describe('ContentWageService', () => {
  let module: TestingModule;
  let service: ContentWageService;
  let prisma: PrismaService;
  let userFactory: UserFactory;
  let testUser: User;
  let context: ContextType;

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
          useFactory: () => ({ req: { user: { id: undefined } } }),
        },
      ],
    }).compile();
    service = module.get(ContentWageService);
    prisma = module.get(PrismaService);
    userFactory = module.get(UserFactory);
    context = module.get(CONTEXT);

    testUser = await userFactory.create();

    await prisma.goldExchangeRate.create({
      data: {
        krwAmount: 100,
        goldAmount: 50,
      },
    });
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
          goldAmount: 50,
        },
      });
    });

    it('calculateWage - by user', async () => {
      const wage = await service.calculateWage({
        gold: 1000,
        duration: 3600,
      });
      expect(wage).toEqual({ krwAmount: 500, goldAmount: 1000 });
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
  });
});
