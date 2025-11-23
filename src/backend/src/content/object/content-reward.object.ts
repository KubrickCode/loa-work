import { Field, Int, ObjectType } from "@nestjs/graphql";
import { BaseObject } from "src/common/object/base.object";

@ObjectType()
export class ContentReward extends BaseObject {
  @Field(() => Int, { description: "컨텐츠 ID" })
  contentId: number;

  @Field(() => Int, { description: "아이템 ID" })
  itemId: number;
}
