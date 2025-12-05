import { Test, TestingModule } from "@nestjs/testing";
import { ContentStatus } from "@prisma/client";
import { ValidationException } from "src/common/exception";
import { PrismaService } from "src/prisma";
import { UserContentService } from "src/user/service/user-content.service";
import { Mock, vi } from "vitest";
import { ContentWageService } from "../wage/wage.service";
import { GroupService } from "./group.service";

describe("GroupService", () => {
  let module: TestingModule;
  let service: GroupService;
  let mockPrismaService: { content: { findMany: Mock } };
  let mockUserContentService: { getContentDuration: Mock };
  let mockContentWageService: { getContentGroupWage: Mock };

  beforeEach(async () => {
    mockPrismaService = {
      content: {
        findMany: vi.fn(),
      },
    };

    mockUserContentService = {
      getContentDuration: vi.fn(),
    };

    mockContentWageService = {
      getContentGroupWage: vi.fn(),
    };

    module = await Test.createTestingModule({
      providers: [
        GroupService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: UserContentService,
          useValue: mockUserContentService,
        },
        {
          provide: ContentWageService,
          useValue: mockContentWageService,
        },
      ],
    }).compile();

    service = module.get(GroupService);
  });

  afterEach(async () => {
    await module.close();
  });

  describe("buildContentGroupWageListWhere", () => {
    it("should return empty object when no filter provided", () => {
      const result = service.buildContentGroupWageListWhere();
      expect(result).toEqual({});
    });

    it("should apply contentCategoryId filter", () => {
      const result = service.buildContentGroupWageListWhere({ contentCategoryId: 1 });
      expect(result.contentCategoryId).toBe(1);
    });

    it("should apply keyword filter with OR condition", () => {
      const result = service.buildContentGroupWageListWhere({ keyword: "아브렐" });
      expect(result.OR).toEqual([
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

    it("should apply status filter", () => {
      const result = service.buildContentGroupWageListWhere({ status: ContentStatus.ACTIVE });
      expect(result.status).toBe(ContentStatus.ACTIVE);
    });

    it("should apply multiple filters", () => {
      const result = service.buildContentGroupWageListWhere({
        contentCategoryId: 1,
        keyword: "test",
        status: ContentStatus.ACTIVE,
      });
      expect(result.contentCategoryId).toBe(1);
      expect(result.status).toBe(ContentStatus.ACTIVE);
      expect(result.OR).toBeDefined();
    });
  });

  describe("buildContentGroupWhere", () => {
    it("should return empty object when no filter provided", () => {
      const result = service.buildContentGroupWhere();
      expect(result).toEqual({});
    });

    it("should apply contentIds filter", () => {
      const result = service.buildContentGroupWhere({ contentIds: [1, 2, 3] });
      expect(result.id).toEqual({ in: [1, 2, 3] });
    });
  });

  describe("findContentsByIds", () => {
    it("should find contents by IDs", async () => {
      const mockContents = [
        { id: 1, name: "Content 1" },
        { id: 2, name: "Content 2" },
      ];

      mockPrismaService.content.findMany.mockResolvedValue(mockContents as any);

      const result = await service.findContentsByIds([1, 2]);

      expect(mockPrismaService.content.findMany).toHaveBeenCalledWith({
        where: { id: { in: [1, 2] } },
      });
      expect(result).toEqual(mockContents);
    });
  });

  describe("validateContentGroup", () => {
    it("should not throw error for empty array", () => {
      expect(() => service.validateContentGroup([])).not.toThrow();
    });

    it("should not throw error for valid content group", () => {
      const contents = [
        { contentCategoryId: 1, id: 1, level: 1490, name: "아브렐슈드" },
        { contentCategoryId: 1, id: 2, level: 1490, name: "아브렐슈드" },
      ];

      expect(() => service.validateContentGroup(contents)).not.toThrow();
    });

    it("should throw ValidationException when levels differ", () => {
      const contents = [
        { contentCategoryId: 1, id: 1, level: 1490, name: "아브렐슈드" },
        { contentCategoryId: 1, id: 2, level: 1500, name: "아브렐슈드" },
      ];

      expect(() => service.validateContentGroup(contents)).toThrow(ValidationException);
      expect(() => service.validateContentGroup(contents)).toThrow("Content level is not the same");
    });

    it("should throw ValidationException when categories differ", () => {
      const contents = [
        { contentCategoryId: 1, id: 1, level: 1490, name: "아브렐슈드" },
        { contentCategoryId: 2, id: 2, level: 1490, name: "아브렐슈드" },
      ];

      expect(() => service.validateContentGroup(contents)).toThrow(ValidationException);
      expect(() => service.validateContentGroup(contents)).toThrow(
        "Content category is not the same"
      );
    });
  });

  describe("groupContentsByNameAndCategory", () => {
    it("should group contents by name and category", () => {
      const contents = [
        { contentCategoryId: 1, id: 1, level: 1490, name: "아브렐슈드" },
        { contentCategoryId: 1, id: 2, level: 1490, name: "아브렐슈드" },
        { contentCategoryId: 1, id: 3, level: 1415, name: "쿠크세이튼" },
      ];

      const result = service.groupContentsByNameAndCategory(contents);

      expect(Object.keys(result)).toHaveLength(2);
      expect(result["아브렐슈드_1"]).toHaveLength(2);
      expect(result["쿠크세이튼_1"]).toHaveLength(1);
    });

    it("should separate same name but different categories", () => {
      const contents = [
        { contentCategoryId: 1, id: 1, level: 1490, name: "컨텐츠" },
        { contentCategoryId: 2, id: 2, level: 1490, name: "컨텐츠" },
      ];

      const result = service.groupContentsByNameAndCategory(contents);

      expect(Object.keys(result)).toHaveLength(2);
      expect(result["컨텐츠_1"]).toHaveLength(1);
      expect(result["컨텐츠_2"]).toHaveLength(1);
    });
  });

  describe("calculateGroupDuration", () => {
    it("should calculate total duration for content group", async () => {
      mockUserContentService.getContentDuration
        .mockResolvedValueOnce(300)
        .mockResolvedValueOnce(600);

      const result = await service.calculateGroupDuration([1, 2]);

      expect(mockUserContentService.getContentDuration).toHaveBeenCalledTimes(2);
      expect(mockUserContentService.getContentDuration).toHaveBeenCalledWith(1);
      expect(mockUserContentService.getContentDuration).toHaveBeenCalledWith(2);
      expect(result).toBe(900);
    });

    it("should return 0 for empty content IDs", async () => {
      const result = await service.calculateGroupDuration([]);
      expect(result).toBe(0);
      expect(mockUserContentService.getContentDuration).not.toHaveBeenCalled();
    });
  });

  describe("findContentGroup", () => {
    it("should find and validate content group", async () => {
      const mockContents = [
        { contentCategoryId: 1, id: 1, level: 1490, name: "아브렐슈드" },
        { contentCategoryId: 1, id: 2, level: 1490, name: "아브렐슈드" },
      ];

      mockPrismaService.content.findMany.mockResolvedValue(mockContents as any);

      const result = await service.findContentGroup({ contentIds: [1, 2] });

      expect(result).toEqual({
        contentCategoryId: 1,
        contentIds: [1, 2],
        level: 1490,
        name: "아브렐슈드",
      });
    });

    it("should throw ValidationException for invalid content group", async () => {
      const mockContents = [
        { contentCategoryId: 1, id: 1, level: 1490, name: "아브렐슈드" },
        { contentCategoryId: 1, id: 2, level: 1500, name: "아브렐슈드" },
      ];

      mockPrismaService.content.findMany.mockResolvedValue(mockContents as any);

      await expect(service.findContentGroup({ contentIds: [1, 2] })).rejects.toThrow(
        ValidationException
      );
    });
  });

  describe("findContentGroupWageList", () => {
    it("should return content group wage list without orderBy", async () => {
      const mockContents = [
        {
          contentCategory: { id: 1, name: "군단장" },
          contentCategoryId: 1,
          contentSeeMoreRewards: [],
          id: 1,
          level: 1490,
          name: "아브렐슈드",
        },
        {
          contentCategory: { id: 1, name: "군단장" },
          contentCategoryId: 1,
          contentSeeMoreRewards: [],
          id: 2,
          level: 1500,
          name: "아브렐슈드",
        },
      ];

      const mockWage = {
        goldAmountPerClear: 5000,
        goldAmountPerHour: 10000,
        krwAmountPerHour: 15000,
      };

      mockPrismaService.content.findMany.mockResolvedValue(mockContents as any);
      mockContentWageService.getContentGroupWage.mockResolvedValue(mockWage);

      const result = await service.findContentGroupWageList();

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        contentGroup: {
          contentCategoryId: 1,
          contentIds: [1, 2],
          level: 1490,
          name: "아브렐슈드",
        },
        goldAmountPerClear: 5000,
        goldAmountPerHour: 10000,
        krwAmountPerHour: 15000,
      });
    });

    it("should return sorted content group wage list with orderBy", async () => {
      const mockContents = [
        {
          contentCategory: { id: 1, name: "군단장" },
          contentCategoryId: 1,
          contentSeeMoreRewards: [],
          id: 1,
          level: 1490,
          name: "A컨텐츠",
        },
        {
          contentCategory: { id: 1, name: "군단장" },
          contentCategoryId: 1,
          contentSeeMoreRewards: [],
          id: 2,
          level: 1500,
          name: "B컨텐츠",
        },
      ];

      mockPrismaService.content.findMany.mockResolvedValue(mockContents as any);
      mockContentWageService.getContentGroupWage
        .mockResolvedValueOnce({
          goldAmountPerClear: 3000,
          goldAmountPerHour: 6000,
          krwAmountPerHour: 9000,
        })
        .mockResolvedValueOnce({
          goldAmountPerClear: 5000,
          goldAmountPerHour: 10000,
          krwAmountPerHour: 15000,
        });

      const result = await service.findContentGroupWageList(undefined, [
        { field: "krwAmountPerHour", order: "desc" },
      ]);

      expect(result).toHaveLength(2);
      expect(result[0].krwAmountPerHour).toBe(15000);
      expect(result[1].krwAmountPerHour).toBe(9000);
    });

    it("should return empty array when no contents found", async () => {
      mockPrismaService.content.findMany.mockResolvedValue([]);

      const result = await service.findContentGroupWageList();

      expect(result).toEqual([]);
      expect(mockContentWageService.getContentGroupWage).not.toHaveBeenCalled();
    });

    it("should pass filter options to getContentGroupWage", async () => {
      const mockContents = [
        {
          contentCategory: { id: 1, name: "군단장" },
          contentCategoryId: 1,
          contentSeeMoreRewards: [],
          id: 1,
          level: 1490,
          name: "아브렐슈드",
        },
      ];

      mockPrismaService.content.findMany.mockResolvedValue(mockContents as any);
      mockContentWageService.getContentGroupWage.mockResolvedValue({
        goldAmountPerClear: 5000,
        goldAmountPerHour: 10000,
        krwAmountPerHour: 15000,
      });

      await service.findContentGroupWageList({
        includeBound: false,
        includeItemIds: [1, 2, 3],
        includeSeeMore: true,
      });

      expect(mockContentWageService.getContentGroupWage).toHaveBeenCalledWith([1], undefined, {
        includeBound: false,
        includeItemIds: [1, 2, 3],
        includeSeeMore: true,
      });
    });
  });
});
