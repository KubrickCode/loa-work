import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { BaseObject } from "src/common/object/base.object";

@ObjectType()
export class UserContentReward extends BaseObject {
  @Field(() => Float, { description: "사용자 지정 평균 수량" })
  averageQuantity: number;

  @Field(() => Int, { description: "콘텐츠 ID" })
  contentId: number;

  @Field(() => Boolean, { description: "사용자 지정 거래 가능 여부" })
  isSellable: boolean;

  @Field(() => Int, { description: "아이템 ID" })
  itemId: number;

  @Field(() => Int, { description: "사용자 ID" })
  userId: number;
}
