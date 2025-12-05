import { CONTEXT } from "@nestjs/graphql";
import { Test, TestingModule } from "@nestjs/testing";
import { ContentStatus } from "@prisma/client";
import { DataLoaderService } from "src/dataloader/data-loader.service";
import { PrismaService } from "src/prisma";
import { UserContentService } from "src/user/service/user-content.service";
import { UserGoldExchangeRateService } from "src/user/service/user-gold-exchange-rate.service";
import { vi } from "vitest";
import { ContentWageService } from "../wage/wage.service";
import { GroupResolver } from "./group.resolver";
import { GroupService } from "./group.service";

type MockContent = {
  contentCategory: {
    id: number;
    name: string;
  };
  contentCategoryId: number;
  contentSeeMoreRewards: Array<{
    item: {
      id: number;
      name: string;
    };
  }>;
  createdAt: Date;
  gate: number;
  id: number;
  level: number;
  name: string;
  status: ContentStatus;
  updatedAt: Date;
};

describe("GroupResolver", () => {
  let module: TestingModule;
  let prisma: PrismaService;
  let resolver: GroupResolver;
  let groupService: GroupService;
  let contentWageService: ContentWageService;

  beforeAll(async () => {
    const mockPrismaService = {
      content: {
        findMany: vi.fn(),
      },
    };

    const mockContentWageService = {
      getContentGroupWage: vi.fn(),
    };

    const mockUserContentService = {
      getContentDuration: vi.fn(),
    };

    const mockUserGoldExchangeRateService = {};

    const mockDataLoaderService = {
      contentCategory: {
        findUniqueOrThrowById: vi.fn(),
      },
    };

    module = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: ContentWageService,
          useValue: mockContentWageService,
        },
        {
          provide: UserContentService,
          useValue: mockUserContentService,
        },
        {
          provide: UserGoldExchangeRateService,
          useValue: mockUserGoldExchangeRateService,
        },
        {
          provide: DataLoaderService,
          useValue: mockDataLoaderService,
        },
        GroupService,
        GroupResolver,
        {
          provide: CONTEXT,
          useValue: { req: { user: { id: undefined } } },
        },
      ],
    }).compile();

    prisma = module.get(PrismaService);
    resolver = module.get(GroupResolver);
    groupService = module.get(GroupService);
    contentWageService = module.get(ContentWageService);
  });

  afterAll(async () => {
    await module.close();
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("contentGroupWageList", () => {
    describe("그룹핑 로직 정확성 검증", () => {
      it("같은 이름과 카테고리의 컨텐츠들이 올바르게 그룹핑되어야 한다", async () => {
        // Given
        const mockContents: MockContent[] = [
          {
            contentCategory: { id: 1, name: "군단장" },
            contentCategoryId: 1,
            contentSeeMoreRewards: [],
            createdAt: new Date(),
            gate: 1,
            id: 1,
            level: 1490,
            name: "아브렐슈드",
            status: ContentStatus.ACTIVE,
            updatedAt: new Date(),
          },
          {
            contentCategory: { id: 1, name: "군단장" },
            contentCategoryId: 1,
            contentSeeMoreRewards: [],
            createdAt: new Date(),
            gate: 1,
            id: 2,
            level: 1500,
            name: "아브렐슈드",
            status: ContentStatus.ACTIVE,
            updatedAt: new Date(),
          },
          {
            contentCategory: { id: 1, name: "군단장" },
            contentCategoryId: 1,
            contentSeeMoreRewards: [],
            createdAt: new Date(),
            gate: 1,
            id: 3,
            level: 1415,
            name: "쿠크세이튼",
            status: ContentStatus.ACTIVE,
            updatedAt: new Date(),
          },
        ];

        const mockWage = {
          goldAmountPerClear: 50,
          goldAmountPerHour: 100,
          krwAmountPerHour: 10000,
        };

        vi.spyOn(prisma.content, "findMany").mockResolvedValue(mockContents as any);
        vi.spyOn(contentWageService, "getContentGroupWage").mockResolvedValue(mockWage);

        // When
        const result = await resolver.contentGroupWageList();

        // Then
        expect(result).toHaveLength(2);

        const abrelshudGroup = result.find((r) => r.contentGroup.name === "아브렐슈드");
        const kuksetoneGroup = result.find((r) => r.contentGroup.name === "쿠크세이튼");

        expect(abrelshudGroup?.contentGroup.contentIds).toEqual([1, 2]);
        expect(kuksetoneGroup?.contentGroup.contentIds).toEqual([3]);
      });
    });

    describe("빈 데이터 입력 시 처리", () => {
      it("컨텐츠가 없을 때 빈 배열을 반환해야 한다", async () => {
        // Given
        vi.spyOn(prisma.content, "findMany").mockResolvedValue([]);

        // When
        const result = await resolver.contentGroupWageList();

        // Then
        expect(result).toEqual([]);
      });
    });

    describe("필터 조건 적용 검증", () => {
      it("buildWhereArgs - contentCategoryId 필터가 올바르게 적용되어야 한다", () => {
        // Given
        const filter = { contentCategoryId: 1 };

        // When
        const whereArgs = groupService.buildContentGroupWageListWhere(filter);

        // Then
        expect(whereArgs.contentCategoryId).toBe(1);
      });

      it("buildWhereArgs - keyword 필터가 OR 조건으로 올바르게 적용되어야 한다", () => {
        // Given
        const filter = { keyword: "아브렐" };

        // When
        const whereArgs = groupService.buildContentGroupWageListWhere(filter);

        // Then
        expect(whereArgs.OR).toEqual([
          {
            name: {
              contains: "아브렐",
              mode: "insensitive",
            },
          },
          {
            contentCategory: {
              name: {
                contains: "아브렐",
                mode: "insensitive",
              },
            },
          },
        ]);
      });

      it("buildWhereArgs - status 필터가 올바르게 적용되어야 한다", () => {
        // Given
        const filter = { status: ContentStatus.ACTIVE };

        // When
        const whereArgs = groupService.buildContentGroupWageListWhere(filter);

        // Then
        expect(whereArgs.status).toBe(ContentStatus.ACTIVE);
      });

      it("buildWhereArgs - 필터가 없을 때 빈 객체를 반환해야 한다", () => {
        // When
        const whereArgs = groupService.buildContentGroupWageListWhere();

        // Then
        expect(whereArgs).toEqual({});
      });
    });

    describe("정렬 옵션별 결과 검증", () => {
      it("orderBy가 없을 때 기본 정렬된 결과를 반환해야 한다", async () => {
        // Given
        const mockContents: MockContent[] = [
          {
            contentCategory: { id: 1, name: "군단장" },
            contentCategoryId: 1,
            contentSeeMoreRewards: [],
            createdAt: new Date(),
            gate: 1,
            id: 1,
            level: 1490,
            name: "B컨텐츠",
            status: ContentStatus.ACTIVE,
            updatedAt: new Date(),
          },
          {
            contentCategory: { id: 1, name: "군단장" },
            contentCategoryId: 1,
            contentSeeMoreRewards: [],
            createdAt: new Date(),
            gate: 1,
            id: 2,
            level: 1500,
            name: "A컨텐츠",
            status: ContentStatus.ACTIVE,
            updatedAt: new Date(),
          },
        ];

        const mockWage = {
          goldAmountPerClear: 50,
          goldAmountPerHour: 100,
          krwAmountPerHour: 10000,
        };

        vi.spyOn(prisma.content, "findMany").mockResolvedValue(mockContents as any);
        vi.spyOn(contentWageService, "getContentGroupWage").mockResolvedValue(mockWage);

        // When
        const result = await resolver.contentGroupWageList();

        // Then
        expect(result).toHaveLength(2);
        expect(result[0].contentGroup.name).toBe("B컨텐츠");
        expect(result[1].contentGroup.name).toBe("A컨텐츠");
      });

      it("orderBy가 주어졌을 때 해당 순서로 정렬된 결과를 반환해야 한다", async () => {
        // Given
        const mockContents: MockContent[] = [
          {
            contentCategory: { id: 1, name: "군단장" },
            contentCategoryId: 1,
            contentSeeMoreRewards: [],
            createdAt: new Date(),
            gate: 1,
            id: 1,
            level: 1490,
            name: "B컨텐츠",
            status: ContentStatus.ACTIVE,
            updatedAt: new Date(),
          },
          {
            contentCategory: { id: 1, name: "군단장" },
            contentCategoryId: 1,
            contentSeeMoreRewards: [],
            createdAt: new Date(),
            gate: 1,
            id: 2,
            level: 1500,
            name: "A컨텐츠",
            status: ContentStatus.ACTIVE,
            updatedAt: new Date(),
          },
        ];

        vi.spyOn(prisma.content, "findMany").mockResolvedValue(mockContents as any);
        vi.spyOn(contentWageService, "getContentGroupWage")
          .mockResolvedValueOnce({
            goldAmountPerClear: 25,
            goldAmountPerHour: 50,
            krwAmountPerHour: 5000,
          })
          .mockResolvedValueOnce({
            goldAmountPerClear: 50,
            goldAmountPerHour: 100,
            krwAmountPerHour: 10000,
          });

        const orderBy = [{ field: "krwAmountPerHour", order: "desc" as const }];

        // When
        const result = await resolver.contentGroupWageList(undefined, orderBy);

        // Then
        expect(result).toHaveLength(2);
        expect(result[0].krwAmountPerHour).toBe(10000);
        expect(result[1].krwAmountPerHour).toBe(5000);
      });
    });
  });
});
