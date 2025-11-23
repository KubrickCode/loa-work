import { Field, Float, ObjectType } from "@nestjs/graphql";
import { ItemKind } from "@prisma/client";
import { BaseObject } from "src/common/object/base.object";

@ObjectType()
export class Item extends BaseObject {
  @Field()
  imageUrl: string;

  @Field(() => ItemKind)
  kind: ItemKind;

  @Field()
  name: string;
}

@ObjectType()
export class UserItem extends BaseObject {
  @Field()
  itemId: number;

  @Field(() => Float)
  price: number;

  @Field()
  userId: number;
}
