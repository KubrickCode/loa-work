import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma';
import { ContentWageService } from './content-wage.service';
import { UserContentService } from '../../user/service/user-content.service';
import { CONTEXT } from '@nestjs/graphql';
import { UserGoldExchangeRateService } from 'src/user/service/user-gold-exchange-rate.service';
import { AuthProvider } from '@prisma/client';

// 현재 중요 테스트는 해당 서비스에만 필요한 상황이라 아래와 같이 작성하고, 필요 시 팩토리 코드로 아래 데이터들을 생성하고 재사용할 수 있도록 해야함.
describe('ContentWageService', () => {
  let module: TestingModule;
  let prisma: PrismaService;
  let service: ContentWageService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        PrismaService,
        ContentWageService,
        UserContentService,
        UserGoldExchangeRateService,
        {
          provide: CONTEXT,
          useValue: { req: { user: { id: undefined } } },
        },
      ],
    }).compile();

    prisma = module.get(PrismaService);
    service = module.get(ContentWageService);

    await prisma.clearDatabase();
  });

  afterEach(async () => {
    await prisma.clearDatabase();
  });

  afterAll(async () => {
    await module.close();
  });

  describe('calculateWage', () => {
    const gold = 1000;
    const duration = 600; // 10 minutes

    beforeEach(async () => {
      await prisma.goldExchangeRate.create({
        data: {
          krwAmount: 25,
          goldAmount: 100,
        },
      });
    });

    it('기본 계산(mock 환율 사용)', async () => {
      const mockGoldExchangeRate = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        krwAmount: 25,
        goldAmount: 100,
      };

      jest
        .spyOn(service['userGoldExchangeRateService'], 'getGoldExchangeRate')
        .mockResolvedValue(mockGoldExchangeRate);

      const result = await service.calculateWage({ gold, duration });

      expect(result).toEqual({
        krwAmountPerHour: 1500,
        goldAmountPerHour: 6000,
      });
    });

    it('기본 계산(실제 환율 사용)', async () => {
      const result = await service.calculateWage({ gold, duration });

      expect(result).toEqual({
        krwAmountPerHour: 1500,
        goldAmountPerHour: 6000,
      });
    });

    it('기본 계산(유저 환율 사용)', async () => {
      const user = await prisma.user.create({
        data: {
          displayName: 'test',
          provider: AuthProvider.GOOGLE,
          refId: 'test',
        },
      });

      await prisma.userGoldExchangeRate.create({
        data: {
          userId: user.id,
          krwAmount: 30,
          goldAmount: 100,
        },
      });

      const userGoldExchangeRateService = module.get(
        UserGoldExchangeRateService,
      );
      userGoldExchangeRateService['context'].req.user = { id: user.id };

      const result = await service.calculateWage({ gold, duration });

      expect(result).toEqual({
        krwAmountPerHour: 1800,
        goldAmountPerHour: 6000,
      });
    });
  });
});
