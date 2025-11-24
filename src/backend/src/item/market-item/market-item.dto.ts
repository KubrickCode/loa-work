import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, MaxLength } from "class-validator";
import {
  ITEM_CATEGORY_NAME_MAX_LENGTH,
  ITEM_GRADE_MAX_LENGTH,
  ITEM_KEYWORD_MAX_LENGTH,
} from "src/common/constants/item.constants";

@InputType()
export class MarketItemListFilter {
  @Field({ description: "카테고리 이름", nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(ITEM_CATEGORY_NAME_MAX_LENGTH)
  categoryName?: string;

  @Field({ description: "등급", nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(ITEM_GRADE_MAX_LENGTH)
  grade?: string;

  @Field(() => Boolean, {
    description: "가격 통계 수집 활성화 여부",
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  isStatScraperEnabled?: boolean;

  @Field({ description: "검색 키워드", nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(ITEM_KEYWORD_MAX_LENGTH)
  keyword?: string;
}
