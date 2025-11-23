import { Field, ObjectType } from "@nestjs/graphql";
import { BaseObject } from "src/common/object/base.object";

@ObjectType()
export class ContentDuration extends BaseObject {
  @Field()
  contentId: number;

  @Field()
  value: number;
}

@ObjectType()
export class UserContentDuration extends BaseObject {
  @Field()
  contentId: number;

  @Field()
  userId: number;

  @Field()
  value: number;
}
