import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator";
import { ContentStatus } from "@prisma/client";
import { ContentWageFilter } from "../wage/wage.dto";
import { CONTENT_NAME_MAX_LENGTH } from "../../common/constants/content.constants";

@InputType()
export class ContentGroupFilter {
  @Field(() => [Number], {
    description: "그룹화할 컨텐츠 ID 목록",
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Min(1, { each: true })
  contentIds?: number[];
}

@InputType()
export class ContentGroupWageListFilter extends ContentWageFilter {
  @Field({
    description: "필터링할 컨텐츠 카테고리 ID",
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  contentCategoryId?: number;

  @Field(() => String, { description: "검색 키워드", nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(CONTENT_NAME_MAX_LENGTH)
  keyword?: string;

  @Field(() => ContentStatus, { description: "컨텐츠 상태", nullable: true })
  @IsOptional()
  @IsEnum(ContentStatus)
  status?: ContentStatus;
}
