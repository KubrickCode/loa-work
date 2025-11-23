import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class ContentSeeMoreRewardEditInput {
  @Field()
  contentId: number;

  @Field()
  itemId: number;

  @Field(() => Float)
  quantity: number;
}

@InputType()
export class ContentSeeMoreRewardsEditInput {
  @Field(() => [ContentSeeMoreRewardEditInput])
  contentSeeMoreRewards: ContentSeeMoreRewardEditInput[];
}

@ObjectType()
export class ContentSeeMoreRewardsEditResult {
  @Field(() => Boolean)
  ok: boolean;
}
