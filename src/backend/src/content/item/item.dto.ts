import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";
import { IsEnum, IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator";
import { ItemKind } from "@prisma/client";
import { ITEM_KEYWORD_MAX_LENGTH } from "src/common/constants/item.constants";
import { MutationResult } from "src/common/dto/mutation-result.dto";

@InputType()
export class ItemsFilter {
  @Field({ description: "제외할 아이템 이름", nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(ITEM_KEYWORD_MAX_LENGTH)
  excludeItemName?: string;

  @Field(() => ItemKind, { description: "아이템 종류", nullable: true })
  @IsOptional()
  @IsEnum(ItemKind)
  kind?: ItemKind;
}

@InputType()
export class EditUserItemPriceInput {
  @Field({ description: "아이템 ID" })
  @IsNumber()
  @Min(1)
  id: number;

  @Field(() => Float, { description: "사용자 지정 가격" })
  @IsNumber()
  @Min(0)
  price: number;
}

@ObjectType()
export class EditUserItemPriceResult extends MutationResult {}
