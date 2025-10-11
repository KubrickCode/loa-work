import { Field, Float, ObjectType } from "@nestjs/graphql";
import { BaseObject } from "src/common/object/base.object";

@ObjectType()
export class UserItem extends BaseObject {
  @Field()
  itemId: number;

  @Field(() => Float)
  price: number;

  @Field()
  userId: number;
}
