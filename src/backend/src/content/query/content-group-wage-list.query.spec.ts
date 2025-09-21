import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma';
import { ContentGroupWageListQuery } from './content-group-wage-list.query';
import { ContentWageService } from '../service/content-wage.service';
import { UserContentService } from '../../user/service/user-content.service';
import { CONTEXT } from '@nestjs/graphql';
import { UserGoldExchangeRateService } from 'src/user/service/user-gold-exchange-rate.service';
import { ContentStatus } from '@prisma/client';

type MockContent = {
  id: number;
  name: string;
  contentCategoryId: number;
  level: number;
  gate: number;
  status: ContentStatus;
  createdAt: Date;
  updatedAt: Date;
  contentCategory: {
    id: number;
    name: string;
  };
  contentSeeMoreRewards: Array<{
    item: {
      id: number;
      name: string;
    };
  }>;
};

describe('ContentGroupWageListQuery', () => {
  let module: TestingModule;
  let prisma: PrismaService;
  let query: ContentGroupWageListQuery;
  let contentWageService: ContentWageService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        PrismaService,
        ContentGroupWageListQuery,
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
    query = module.get(ContentGroupWageListQuery);
    contentWageService = module.get(ContentWageService);
  });

  afterAll(async () => {
    await module.close();
  });

  describe('contentGroupWageList', () => {
    describe('그룹핑 로직 정확성 검증', () => {
      it('같은 이름과 카테고리의 컨텐츠들이 올바르게 그룹핑되어야 한다', async () => {
        // Given
        const mockContents: MockContent[] = [
          {
            id: 1,
            name: '아브렐슈드',
            contentCategoryId: 1,
            level: 1490,
            gate: 1,
            status: ContentStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
            contentCategory: { id: 1, name: '군단장' },
            contentSeeMoreRewards: [],
          },
          {
            id: 2,
            name: '아브렐슈드',
            contentCategoryId: 1,
            level: 1500,
            gate: 1,
            status: ContentStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
            contentCategory: { id: 1, name: '군단장' },
            contentSeeMoreRewards: [],
          },
          {
            id: 3,
            name: '쿠크세이튼',
            contentCategoryId: 1,
            level: 1415,
            gate: 1,
            status: ContentStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
            contentCategory: { id: 1, name: '군단장' },
            contentSeeMoreRewards: [],
          },
        ];

        const mockWage = {
          krwAmountPerHour: 10000,
          goldAmountPerHour: 100,
          goldAmountPerClear: 50,
        };

        const mockFindMany = jest.fn().mockResolvedValue(mockContents);
        prisma.content.findMany = mockFindMany;
        jest
          .spyOn(contentWageService, 'getContentGroupWage')
          .mockResolvedValue(mockWage);

        // When
        const result = await query.contentGroupWageList();

        // Then
        expect(result).toHaveLength(2);

        const abrelshudGroup = result.find(
          (r) => r.contentGroup.name === '아브렐슈드',
        );
        const kuksetoneGroup = result.find(
          (r) => r.contentGroup.name === '쿠크세이튼',
        );

        expect(abrelshudGroup?.contentGroup.contentIds).toEqual([1, 2]);
        expect(kuksetoneGroup?.contentGroup.contentIds).toEqual([3]);
      });
    });

    describe('빈 데이터 입력 시 처리', () => {
      it('컨텐츠가 없을 때 빈 배열을 반환해야 한다', async () => {
        // Given
        jest.spyOn(prisma.content, 'findMany').mockResolvedValue([]);

        // When
        const result = await query.contentGroupWageList();

        // Then
        expect(result).toEqual([]);
      });
    });

    describe('필터 조건 적용 검증', () => {
      it('buildWhereArgs - contentCategoryId 필터가 올바르게 적용되어야 한다', () => {
        // Given
        const filter = { contentCategoryId: 1 };

        // When
        const whereArgs = query.buildWhereArgs(filter);

        // Then
        expect(whereArgs.contentCategoryId).toBe(1);
      });

      it('buildWhereArgs - keyword 필터가 OR 조건으로 올바르게 적용되어야 한다', () => {
        // Given
        const filter = { keyword: '아브렐' };

        // When
        const whereArgs = query.buildWhereArgs(filter);

        // Then
        expect(whereArgs.OR).toEqual([
          {
            name: {
              contains: '아브렐',
              mode: 'insensitive',
            },
          },
          {
            contentCategory: {
              name: {
                contains: '아브렐',
                mode: 'insensitive',
              },
            },
          },
        ]);
      });

      it('buildWhereArgs - status 필터가 올바르게 적용되어야 한다', () => {
        // Given
        const filter = { status: ContentStatus.ACTIVE };

        // When
        const whereArgs = query.buildWhereArgs(filter);

        // Then
        expect(whereArgs.status).toBe(ContentStatus.ACTIVE);
      });

      it('buildWhereArgs - 필터가 없을 때 빈 객체를 반환해야 한다', () => {
        // When
        const whereArgs = query.buildWhereArgs();

        // Then
        expect(whereArgs).toEqual({});
      });
    });

    describe('정렬 옵션별 결과 검증', () => {
      it('orderBy가 없을 때 기본 정렬된 결과를 반환해야 한다', async () => {
        // Given
        const mockContents: MockContent[] = [
          {
            id: 1,
            name: 'B컨텐츠',
            contentCategoryId: 1,
            level: 1490,
            gate: 1,
            status: ContentStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
            contentCategory: { id: 1, name: '군단장' },
            contentSeeMoreRewards: [],
          },
          {
            id: 2,
            name: 'A컨텐츠',
            contentCategoryId: 1,
            level: 1500,
            gate: 1,
            status: ContentStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
            contentCategory: { id: 1, name: '군단장' },
            contentSeeMoreRewards: [],
          },
        ];

        const mockWage = {
          krwAmountPerHour: 10000,
          goldAmountPerHour: 100,
          goldAmountPerClear: 50,
        };

        const mockFindMany = jest.fn().mockResolvedValue(mockContents);
        prisma.content.findMany = mockFindMany;
        jest
          .spyOn(contentWageService, 'getContentGroupWage')
          .mockResolvedValue(mockWage);

        // When
        const result = await query.contentGroupWageList();

        // Then
        expect(result).toHaveLength(2);
        expect(result[0].contentGroup.name).toBe('B컨텐츠');
        expect(result[1].contentGroup.name).toBe('A컨텐츠');
      });

      it('orderBy가 주어졌을 때 해당 순서로 정렬된 결과를 반환해야 한다', async () => {
        // Given
        const mockContents: MockContent[] = [
          {
            id: 1,
            name: 'B컨텐츠',
            contentCategoryId: 1,
            level: 1490,
            gate: 1,
            status: ContentStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
            contentCategory: { id: 1, name: '군단장' },
            contentSeeMoreRewards: [],
          },
          {
            id: 2,
            name: 'A컨텐츠',
            contentCategoryId: 1,
            level: 1500,
            gate: 1,
            status: ContentStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
            contentCategory: { id: 1, name: '군단장' },
            contentSeeMoreRewards: [],
          },
        ];

        const mockFindMany = jest.fn().mockResolvedValue(mockContents);
        prisma.content.findMany = mockFindMany;
        jest
          .spyOn(contentWageService, 'getContentGroupWage')
          .mockResolvedValueOnce({
            krwAmountPerHour: 5000,
            goldAmountPerHour: 50,
            goldAmountPerClear: 25,
          })
          .mockResolvedValueOnce({
            krwAmountPerHour: 10000,
            goldAmountPerHour: 100,
            goldAmountPerClear: 50,
          });

        const orderBy = [{ field: 'krwAmountPerHour', order: 'desc' as const }];

        // When
        const result = await query.contentGroupWageList(undefined, orderBy);

        // Then
        expect(result).toHaveLength(2);
        expect(result[0].krwAmountPerHour).toBe(10000);
        expect(result[1].krwAmountPerHour).toBe(5000);
      });
    });
  });
});
