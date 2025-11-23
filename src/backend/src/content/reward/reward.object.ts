import { Field, Float, ObjectType } from "@nestjs/graphql";
import { BaseObject } from "src/common/object/base.object";

@ObjectType()
export class ContentReward extends BaseObject {
  @Field()
  itemId: number;
}

@ObjectType()
export class UserContentReward extends BaseObject {
  @Field(() => Float)
  averageQuantity: number;

  @Field()
  contentId: number;

  @Field()
  isSellable: boolean;

  @Field()
  userId: number;
}
