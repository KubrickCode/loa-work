import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class ContentRewardEditInput {
  @Field(() => Float, { description: "평균 획득 수량" })
  averageQuantity: number;

  @Field({ description: "컨텐츠 ID" })
  contentId: number;

  @Field(() => Boolean, { description: "거래 가능 여부" })
  isSellable: boolean;

  @Field({ description: "아이템 ID" })
  itemId: number;
}

@InputType()
export class ContentRewardsEditInput {
  @Field(() => [ContentRewardEditInput], { description: "컨텐츠 보상 목록" })
  contentRewards: ContentRewardEditInput[];

  @Field({ description: "제보 가능 여부" })
  isReportable: boolean;
}

@ObjectType()
export class ContentRewardsEditResult {
  @Field(() => Boolean, { description: "성공 여부" })
  ok: boolean;
}
