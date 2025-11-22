import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class ContentCreateInput {
  @Field({ description: "컨텐츠 카테고리 ID" })
  categoryId: number;

  @Field(() => [ContentCreateItemInput], { description: "컨텐츠 보상 목록" })
  contentRewards: ContentCreateItemInput[];

  @Field(() => [ContentCreateSeeMoreRewardInput], {
    description: "더보기 컨텐츠 보상 목록",
    nullable: true,
  })
  contentSeeMoreRewards?: ContentCreateSeeMoreRewardInput[];

  @Field({ description: "소요 시간 (초 단위)" })
  duration: number;

  @Field({ description: "관문", nullable: true })
  gate?: number | null;

  @Field({ description: "레벨" })
  level: number;

  @Field({ description: "이름" })
  name: string;
}

@InputType()
export class ContentCreateItemInput {
  @Field(() => Float, { description: "평균 획득 수량" })
  averageQuantity: number;

  @Field({ description: "귀속 여부" })
  isBound: boolean;

  @Field({ description: "아이템 ID" })
  itemId: number;
}

@ObjectType()
export class ContentCreateResult {
  @Field(() => Boolean, { description: "성공 여부" })
  ok: boolean;
}

@InputType()
export class ContentCreateSeeMoreRewardInput {
  @Field({ description: "아이템 ID" })
  itemId: number;

  @Field(() => Float, { description: "수량" })
  quantity: number;
}
