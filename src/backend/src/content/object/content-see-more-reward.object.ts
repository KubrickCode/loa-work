import { Field, ObjectType } from "@nestjs/graphql";
import { BaseObject } from "src/common/object/base.object";

@ObjectType()
export class ContentSeeMoreReward extends BaseObject {
  @Field()
  contentId: number;

  @Field()
  itemId: number;
}
