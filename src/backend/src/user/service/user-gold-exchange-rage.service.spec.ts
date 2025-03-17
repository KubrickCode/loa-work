import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma';
import { CONTEXT } from '@nestjs/graphql';
import { UserGoldExchangeRateService } from 'src/user/service/user-gold-exchange-rate.service';
import { UserFactory } from 'src/test/factory/user.factory';
import { GoldExchangeRate } from '@prisma/client';

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

  describe('getGoldExchangeRate', () => {
    let goldExchangeRate: GoldExchangeRate;

    beforeAll(async () => {
      goldExchangeRate = await prisma.goldExchangeRate.create({
        data: {
          goldAmount: 100,
          krwAmount: 25,
        },
      });
    });

    it('not logged in user', async () => {
      const { goldAmount, krwAmount } = await service.getGoldExchangeRate();
      expect(goldAmount).toEqual(goldExchangeRate.goldAmount);
      expect(krwAmount).toEqual(goldExchangeRate.krwAmount);
    });

    it('logged in user', async () => {
      const userGoldAmount = 100;
      const userKrwAmount = 30;

      const user = await userFactory.create();
      service['context'].req.user = { id: user.id };

      await prisma.userGoldExchangeRate.create({
        data: {
          userId: user.id,
          goldAmount: userGoldAmount,
          krwAmount: userKrwAmount,
        },
      });

      const { goldAmount, krwAmount } = await service.getGoldExchangeRate();

      expect(goldAmount).toEqual(userGoldAmount);
      expect(krwAmount).toEqual(userKrwAmount);
    });
  });
});
