import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";
import { ContentStatus } from "@prisma/client";

@InputType()
export class ContentListFilter {
  @Field({
    description: "필터링할 컨텐츠 카테고리 ID",
    nullable: true,
  })
  contentCategoryId?: number;

  @Field(() => Boolean, {
    description: "추가 보상(더보기) 포함 여부",
    nullable: true,
  })
  includeSeeMore?: boolean;

  @Field(() => String, {
    description: "검색 키워드",
    nullable: true,
  })
  keyword?: string;

  @Field(() => ContentStatus, {
    description: "컨텐츠 상태",
    nullable: true,
  })
  status?: ContentStatus;
}

@InputType()
export class ContentsFilter {
  @Field(() => [Number], {
    description: "필터링할 컨텐츠 ID 목록",
    nullable: true,
  })
  ids?: number[];
}

@InputType()
export class CreateContentInput {
  @Field({ description: "컨텐츠 카테고리 ID" })
  categoryId: number;

  @Field(() => [CreateContentItemInput], {
    description: "컨텐츠 보상 아이템 목록",
  })
  contentRewards: CreateContentItemInput[];

  @Field(() => [CreateContentSeeMoreRewardInput], {
    description: "추가 보상(더보기) 아이템 목록",
    nullable: true,
  })
  contentSeeMoreRewards?: CreateContentSeeMoreRewardInput[];

  @Field({ description: "소요 시간 (초)" })
  duration: number;

  @Field({ description: "관문 번호", nullable: true })
  gate?: number | null;

  @Field({ description: "레벨" })
  level: number;

  @Field({ description: "컨텐츠 이름" })
  name: string;
}

@InputType()
export class CreateContentItemInput {
  @Field(() => Float, { description: "평균 획득 수량" })
  averageQuantity: number;

  @Field({ description: "귀속 여부" })
  isBound: boolean;

  @Field({ description: "아이템 ID" })
  itemId: number;
}

@InputType()
export class CreateContentSeeMoreRewardInput {
  @Field({ description: "아이템 ID" })
  itemId: number;

  @Field(() => Float, { description: "획득 수량" })
  quantity: number;
}

@ObjectType()
export class CreateContentResult {
  @Field(() => Boolean, { description: "성공 여부" })
  ok: boolean;
}
