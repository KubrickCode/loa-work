import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma';
import { CONTEXT } from '@nestjs/graphql';
import { UserGoldExchangeRateService } from 'src/user/service/user-gold-exchange-rate.service';
import { UserFactory } from 'src/test/factory/user.factory';
import { User } from '@prisma/client';

describe('UserGoldExchangeRateService', () => {
  let module: TestingModule;
  let service: UserGoldExchangeRateService;
  let userFactory: UserFactory;
  let prisma: PrismaService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        PrismaService,
        UserGoldExchangeRateService,
        UserFactory,
        {
          provide: CONTEXT,
          useValue: { req: { user: { id: undefined } } },
        },
      ],
    }).compile();

    service = module.get(UserGoldExchangeRateService);
    userFactory = module.get(UserFactory);
    prisma = module.get(PrismaService);
  });

  afterAll(async () => {
    await module.close();
  });

  describe('logged in', () => {
    const userGoldAmount = 100;
    const userKrwAmount = 30;
    let user: User;

    beforeAll(async () => {
      user = await userFactory.create();
      service['context'].req.user = { id: user.id };
    });

    describe('getGoldExchangeRate', () => {
      beforeAll(async () => {
        await prisma.goldExchangeRate.create({
          data: {
            goldAmount: 100,
            krwAmount: 25,
          },
        });
      });

      it('basic', async () => {
        const user = await userFactory.create();
        service['context'].req.user = { id: user.id };

        await prisma.userGoldExchangeRate.create({
          data: {
            userId: user.id,
            goldAmount: userGoldAmount,
            krwAmount: userKrwAmount,
          },
        });

        const result = await service.getGoldExchangeRate();

        expect(result.goldAmount).toEqual(userGoldAmount);
        expect(result.krwAmount).toEqual(userKrwAmount);
      });
    });
  });

  describe('not logged in', () => {
    const goldAmount = 100;
    const krwAmount = 25;

    beforeAll(async () => {
      service['context'].req.user = { id: undefined };
    });

    describe('getGoldExchangeRate', () => {
      beforeAll(async () => {
        await prisma.goldExchangeRate.create({
          data: {
            goldAmount,
            krwAmount,
          },
        });
      });

      it('basic', async () => {
        const result = await service.getGoldExchangeRate();
        expect(result.goldAmount).toEqual(goldAmount);
        expect(result.krwAmount).toEqual(krwAmount);
      });
    });
  });
});
