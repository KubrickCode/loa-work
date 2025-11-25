import { Prisma } from "@prisma/client";

/**
 * Content 기본 정렬 순서
 * - 카테고리 ID 오름차순
 * - 레벨 오름차순
 * - ID 오름차순
 */
export const DEFAULT_CONTENT_ORDER_BY: Prisma.ContentOrderByWithRelationInput[] = [
  { contentCategory: { id: "asc" } },
  { level: "asc" },
  { id: "asc" },
];

// 추후 유지보수성이 확실치 않은 데이터 구조 및 순서라 db에서 관리하지 않고 임시로 상수로 보상 아이템 순서를 관리함.
export const ItemSortOrder = {
  "1레벨 보석": 7,
  골드: 1,
  "골드(귀속)": 2,
  "빙하의 숨결": 9,
  실링: 10,
  "용암의 숨결": 8,
  "운명의 돌파석": 4,
  "운명의 수호석": 6,
  "운명의 파괴석": 5,
  "운명의 파편": 3,
  "카드 경험치": 11,
};
