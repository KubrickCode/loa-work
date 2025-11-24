import { Field, ObjectType } from "@nestjs/graphql";
import { BaseObject } from "src/common/object/base.object";

@ObjectType()
export class ContentObjectWageFilter {
  @Field(() => Boolean, {
    description: "귀속 아이템 포함 여부",
    nullable: true,
  })
  includeBound?: boolean;

  @Field(() => [String], {
    description: "포함할 아이템 ID 목록",
    nullable: true,
  })
  includeItemIds?: string[];

  @Field(() => Boolean, {
    description: "추가 보상(더보기) 포함 여부",
    nullable: true,
  })
  includeSeeMore?: boolean;
}

@ObjectType()
export class Content extends BaseObject {
  @Field({ description: "컨텐츠 카테고리 ID" })
  contentCategoryId: number;

  @Field({ description: "관문 번호", nullable: true })
  gate?: number;

  @Field({ description: "레벨" })
  level: number;

  @Field({ description: "컨텐츠 이름" })
  name: string;

  @Field(() => ContentObjectWageFilter, {
    description: "시급 계산 필터",
    nullable: true,
  })
  wageFilter?: ContentObjectWageFilter;
}
