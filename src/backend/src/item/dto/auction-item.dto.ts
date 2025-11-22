import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString } from "class-validator";

@InputType()
export class AuctionItemListFilter {
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
  nameKeyword?: string;
}
