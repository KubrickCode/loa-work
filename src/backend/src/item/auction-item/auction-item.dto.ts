import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, MaxLength } from "class-validator";
import { ITEM_KEYWORD_MAX_LENGTH } from "src/common/constants/item.constants";

@InputType()
export class AuctionItemListFilter {
  @Field(() => Boolean, {
    description: "가격 통계 수집 활성화 여부",
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  isStatScraperEnabled?: boolean;

  @Field(() => String, {
    description: "아이템 이름 검색 키워드",
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(ITEM_KEYWORD_MAX_LENGTH)
  nameKeyword?: string;
}
