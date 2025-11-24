import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class EditContentRewardInput {
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
export class EditContentRewardsInput {
  @Field(() => [EditContentRewardInput], {
    description: "수정할 컨텐츠 보상 목록",
  })
  contentRewards: EditContentRewardInput[];

  @Field({ description: "제보 가능 여부" })
  isReportable: boolean;
}

@ObjectType()
export class EditContentRewardsResult {
  @Field(() => Boolean, { description: "성공 여부" })
  ok: boolean;
}

@InputType()
export class ReportContentRewardInput {
  @Field(() => Float, { description: "평균 획득 수량" })
  averageQuantity: number;

  @Field({ description: "컨텐츠 보상 ID" })
  id: number;
}

@InputType()
export class ReportContentRewardsInput {
  @Field(() => [ReportContentRewardInput], {
    description: "제보할 컨텐츠 보상 목록",
  })
  contentRewards: ReportContentRewardInput[];
}

@ObjectType()
export class ReportContentRewardsResult {
  @Field(() => Boolean, { description: "성공 여부" })
  ok: boolean;
}
