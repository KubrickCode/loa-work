import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";

@InputType()
export class GoldExchangeRateEditInput {
  @Field(() => Int)
  krwAmount: number;
}

@ObjectType()
export class GoldExchangeRateEditResult {
  @Field(() => Boolean)
  ok: boolean;
}
