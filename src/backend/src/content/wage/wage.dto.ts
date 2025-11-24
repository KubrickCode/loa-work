import { Field, Float, InputType, Int, ObjectType } from "@nestjs/graphql";
import { ContentStatus } from "@prisma/client";

@InputType()
export class ContentWageFilter {
  @Field(() => Boolean, {
    description: "귀속 아이템 포함 여부",
    nullable: true,
  })
  includeBound?: boolean;

  @Field(() => [Number], {
    description: "포함할 아이템 ID 목록",
    nullable: true,
  })
  includeItemIds?: number[];

  @Field(() => Boolean, {
    description: "추가 보상(더보기) 포함 여부",
    nullable: true,
  })
  includeSeeMore?: boolean;
}

@InputType()
export class ContentWageListFilter extends ContentWageFilter {
  @Field({
    description: "필터링할 컨텐츠 카테고리 ID",
    nullable: true,
  })
  contentCategoryId?: number;

  @Field(() => String, { description: "검색 키워드", nullable: true })
  keyword?: string;

  @Field(() => ContentStatus, { description: "컨텐츠 상태", nullable: true })
  status?: ContentStatus;
}

@InputType()
export class CalculateCustomContentWageInput {
  @Field(() => [CalculateCustomContentWageItemInput], {
    description: "아이템 목록",
  })
  items: CalculateCustomContentWageItemInput[];

  @Field(() => Int, { description: "분" })
  minutes: number;

  @Field(() => Int, { description: "초" })
  seconds: number;
}

@InputType()
export class CalculateCustomContentWageItemInput {
  @Field({ description: "아이템 ID" })
  id: number;

  @Field(() => Float, { description: "획득 수량" })
  quantity: number;
}

@ObjectType()
export class CalculateCustomContentWageResult {
  @Field({ description: "회당 골드 획득량" })
  goldAmountPerClear: number;

  @Field({ description: "시급 (골드)" })
  goldAmountPerHour: number;

  @Field({ description: "시급 (원화)" })
  krwAmountPerHour: number;

  @Field(() => Boolean, { description: "성공 여부" })
  ok: boolean;
}
