import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";
import { ItemKind } from "@prisma/client";

@InputType()
export class ItemsFilter {
  @Field({ description: "제외할 아이템 이름", nullable: true })
  excludeItemName?: string;

  @Field(() => ItemKind, { description: "아이템 종류", nullable: true })
  kind?: ItemKind;
}

@InputType()
export class EditUserItemPriceInput {
  @Field({ description: "아이템 ID" })
  id: number;

  @Field(() => Float, { description: "사용자 지정 가격" })
  price: number;
}

@ObjectType()
export class EditUserItemPriceResult {
  @Field(() => Boolean, { description: "성공 여부" })
  ok: boolean;
}
