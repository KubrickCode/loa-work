import { Field, Float, ObjectType } from "@nestjs/graphql";
import { BaseObject } from "src/common/object/base.object";

@ObjectType()
export class GoldExchangeRate extends BaseObject {
  @Field(() => Float)
  goldAmount: number;

  @Field(() => Float)
  krwAmount: number;
}
