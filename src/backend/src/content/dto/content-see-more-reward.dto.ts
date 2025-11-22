import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class ContentSeeMoreRewardEditInput {
  @Field({ description: "컨텐츠 ID" })
  contentId: number;

  @Field({ description: "아이템 ID" })
  itemId: number;

  @Field(() => Float, { description: "수량" })
  quantity: number;
}

@InputType()
export class ContentSeeMoreRewardsEditInput {
  @Field(() => [ContentSeeMoreRewardEditInput], {
    description: "더보기 컨텐츠 보상 목록",
  })
  contentSeeMoreRewards: ContentSeeMoreRewardEditInput[];
}

@ObjectType()
export class ContentSeeMoreRewardsEditResult {
  @Field(() => Boolean, { description: "성공 여부" })
  ok: boolean;
}
