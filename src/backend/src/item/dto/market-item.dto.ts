import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString } from "class-validator";

@InputType()
export class MarketItemListFilter {
  @Field(() => String, {
    description: "카테고리명 필터",
    nullable: true,
  })
  @IsString()
  @IsOptional()
  categoryName?: string;

  @Field(() => String, {
    description: "등급 필터",
    nullable: true,
  })
  @IsString()
  @IsOptional()
  grade?: string;

  @Field(() => Boolean, {
    description: "통계 수집 활성화 여부",
    nullable: true,
  })
  @IsBoolean()
  @IsOptional()
  isStatScraperEnabled?: boolean;

  @Field(() => String, {
    description: "아이템명 검색 키워드",
    nullable: true,
  })
  @IsString()
  @IsOptional()
  keyword?: string;
}
