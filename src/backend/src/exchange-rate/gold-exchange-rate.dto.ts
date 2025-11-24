import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsNumber, Min } from "class-validator";
import { MutationResult } from "src/common/dto/mutation-result.dto";

@InputType()
export class EditGoldExchangeRateInput {
  @Field(() => Int, { description: "100골드당 원화 금액" })
  @IsNumber()
  @Min(1)
  krwAmount: number;
}

@ObjectType()
export class EditGoldExchangeRateResult extends MutationResult {}
