import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class ContentRewardEditInput {
  @Field(() => Float)
  averageQuantity: number;

  @Field()
  contentId: number;

  @Field(() => Boolean)
  isSellable: boolean;

  @Field()
  itemId: number;
}

@InputType()
export class ContentRewardsEditInput {
  @Field(() => [ContentRewardEditInput])
  contentRewards: ContentRewardEditInput[];

  @Field()
  isReportable: boolean;
}

@ObjectType()
export class ContentRewardsEditResult {
  @Field(() => Boolean)
  ok: boolean;
}

@InputType()
export class ContentRewardReportInput {
  @Field(() => Float)
  averageQuantity: number;

  @Field()
  id: number;
}

@InputType()
export class ContentRewardsReportInput {
  @Field(() => [ContentRewardReportInput])
  contentRewards: ContentRewardReportInput[];
}

@ObjectType()
export class ContentRewardsReportResult {
  @Field(() => Boolean)
  ok: boolean;
}
