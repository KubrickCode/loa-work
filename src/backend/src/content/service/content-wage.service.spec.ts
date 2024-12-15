import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma';
import { ContentWageService } from './content-wage.service';
import { UserContentService } from '../../user/service/user-content.service';
import { CONTEXT } from '@nestjs/graphql';
import { UserGoldExchangeRateService } from 'src/user/service/user-gold-exchange-rate.service';
import { AuthProvider } from '@prisma/client';

describe('ContentWageService', () => {
  let module: TestingModule;
  let service: ContentWageService;
  let prisma: PrismaService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        PrismaService,
        ContentWageService,
        UserContentService,
        UserGoldExchangeRateService,
        {
          provide: CONTEXT,
          useValue: { req: { user: { id: 1 } } },
        },
      ],
    }).compile();
    service = module.get(ContentWageService);
    prisma = module.get(PrismaService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('calculateWage', async () => {
    const user = await prisma.user.create({
      data: {
        displayName: 'test',
        email: 'test@test.com',
        provider: AuthProvider.GOOGLE,
        refId: 'test',
      },
    });

    await prisma.goldExchangeRate.create({
      data: {
        krwAmount: 100,
        goldAmount: 50,
      },
    });

    await prisma.userGoldExchangeRate.create({
      data: {
        userId: user.id,
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
