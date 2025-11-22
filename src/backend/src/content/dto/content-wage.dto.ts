import { Field, Float, InputType, Int, ObjectType } from "@nestjs/graphql";

@InputType()
export class CustomContentWageCalculateInput {
  @Field(() => [CustomContentWageCalculateItemInput], {
    description: "아이템 목록",
  })
  items: CustomContentWageCalculateItemInput[];

  @Field(() => Int, { description: "분" })
  minutes: number;

  @Field(() => Int, { description: "초" })
  seconds: number;
}

@InputType()
export class CustomContentWageCalculateItemInput {
  @Field({ description: "아이템 ID" })
  id: number;

  @Field(() => Float, { description: "수량" })
  quantity: number;
}

@ObjectType()
export class CustomContentWageCalculateResult {
  @Field({ description: "클리어당 골드 획득량" })
  goldAmountPerClear: number;

  @Field({ description: "시간당 골드 획득량" })
  goldAmountPerHour: number;

  @Field({ description: "시간당 원화 환산 금액" })
  krwAmountPerHour: number;

  @Field(() => Boolean, { description: "성공 여부" })
  ok: boolean;
}
