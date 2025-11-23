import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";
import { ItemKind } from "@prisma/client";

@InputType()
export class ItemsFilter {
  @Field({ nullable: true })
  excludeItemName?: string;

  @Field(() => ItemKind, { nullable: true })
  kind?: ItemKind;
}

@InputType()
export class UserItemPriceEditInput {
  @Field()
  id: number;

  @Field(() => Float)
  price: number;
}

@ObjectType()
export class UserItemPriceEditResult {
  @Field(() => Boolean)
  ok: boolean;
}
