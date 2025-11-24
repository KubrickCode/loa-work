import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";

@InputType()
export class EditGoldExchangeRateInput {
  @Field(() => Int, { description: "100골드당 원화 금액" })
  krwAmount: number;
}

@ObjectType()
export class EditGoldExchangeRateResult {
  @Field(() => Boolean, { description: "성공 여부" })
  ok: boolean;
}
