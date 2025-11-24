import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class EditContentSeeMoreRewardInput {
  @Field({ description: "컨텐츠 ID" })
  contentId: number;

  @Field({ description: "아이템 ID" })
  itemId: number;

  @Field(() => Float, { description: "획득 수량" })
  quantity: number;
}

@InputType()
export class EditContentSeeMoreRewardsInput {
  @Field(() => [EditContentSeeMoreRewardInput], {
    description: "수정할 추가 보상(더보기) 목록",
  })
  contentSeeMoreRewards: EditContentSeeMoreRewardInput[];
}

@ObjectType()
export class EditContentSeeMoreRewardsResult {
  @Field(() => Boolean, { description: "성공 여부" })
  ok: boolean;
}
