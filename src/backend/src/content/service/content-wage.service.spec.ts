import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma';
import { ContentWageService } from './content-wage.service';
import { UserContentService } from '../../user/service/user-content.service';
import { CONTEXT } from '@nestjs/graphql';
import { UserGoldExchangeRateService } from 'src/user/service/user-gold-exchange-rate.service';
import { User } from '@prisma/client';
import { UserFactory } from 'src/test/factory/user.factory';

describe('ContentWageService', () => {
  let module: TestingModule;
  let service: ContentWageService;
  let prisma: PrismaService;
  let userFactory: UserFactory;
  let testUser: User;

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

    testUser = await userFactory.create();

    const context = module.get(CONTEXT);
    context.req.user.id = testUser.id;
  });

  afterAll(async () => {
    await module.close();
  });

  it('calculateWage', async () => {
    await prisma.goldExchangeRate.create({
      data: {
        krwAmount: 100,
        goldAmount: 50,
      },
    });

    await prisma.userGoldExchangeRate.create({
      data: {
        userId: testUser.id,
        krwAmount: 100,
        goldAmount: 50,
      },
    });

    const wage = await service.calculateWage({
      gold: 1000,
      duration: 3600,
    });
    expect(wage).toEqual({ krwAmount: 500, goldAmount: 1000 });
  });
});
