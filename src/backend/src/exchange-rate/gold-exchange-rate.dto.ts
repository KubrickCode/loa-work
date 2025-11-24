import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsNumber, Min } from "class-validator";

@InputType()
export class EditGoldExchangeRateInput {
  @Field(() => Int, { description: "100골드당 원화 금액" })
  @IsNumber()
  @Min(1)
  krwAmount: number;
}

@ObjectType()
export class EditGoldExchangeRateResult {
  @Field(() => Boolean, { description: "성공 여부" })
  ok: boolean;
}
