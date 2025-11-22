import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class UserItemPriceEditInput {
  @Field({ description: "아이템 ID" })
  id: number;

  @Field(() => Float, { description: "가격" })
  price: number;
}

@ObjectType()
export class UserItemPriceEditResult {
  @Field(() => Boolean, { description: "성공 여부" })
  ok: boolean;
}
