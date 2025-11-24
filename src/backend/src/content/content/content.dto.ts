import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from "class-validator";
import { ContentStatus } from "@prisma/client";
import { Type } from "class-transformer";
import { CONTENT_LEVEL_MAX, CONTENT_NAME_MAX_LENGTH } from "src/common/constants/content.constants";
import { MutationResult } from "src/common/dto/mutation-result.dto";

@InputType()
export class ContentListFilter {
  @Field({
    description: "필터링할 컨텐츠 카테고리 ID",
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  contentCategoryId?: number;

  @Field(() => Boolean, {
    description: "추가 보상(더보기) 포함 여부",
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  includeSeeMore?: boolean;

  @Field(() => String, {
    description: "검색 키워드",
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(CONTENT_NAME_MAX_LENGTH)
  keyword?: string;

  @Field(() => ContentStatus, {
    description: "컨텐츠 상태",
    nullable: true,
  })
  @IsOptional()
  @IsEnum(ContentStatus)
  status?: ContentStatus;
}

@InputType()
export class ContentsFilter {
  @Field(() => [Number], {
    description: "필터링할 컨텐츠 ID 목록",
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Min(1, { each: true })
  ids?: number[];
}

@InputType()
export class CreateContentInput {
  @Field({ description: "컨텐츠 카테고리 ID" })
  @IsNumber()
  @Min(1)
  categoryId: number;

  @Field(() => [CreateContentItemInput], {
    description: "컨텐츠 보상 아이템 목록",
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateContentItemInput)
  contentRewards: CreateContentItemInput[];

  @Field(() => [CreateContentSeeMoreRewardInput], {
    description: "추가 보상(더보기) 아이템 목록",
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateContentSeeMoreRewardInput)
  contentSeeMoreRewards?: CreateContentSeeMoreRewardInput[];

  @Field({ description: "소요 시간 (초)" })
  @IsNumber()
  @Min(1)
  duration: number;

  @Field({ description: "관문 번호", nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  gate?: number | null;

  @Field({ description: "레벨" })
  @IsNumber()
  @Min(1)
  @Max(CONTENT_LEVEL_MAX)
  level: number;

  @Field({ description: "컨텐츠 이름" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(CONTENT_NAME_MAX_LENGTH)
  name: string;
}

@InputType()
export class CreateContentItemInput {
  @Field(() => Float, { description: "평균 획득 수량" })
  @IsNumber()
  @Min(0)
  averageQuantity: number;

  @Field({ description: "귀속 여부" })
  @IsBoolean()
  isBound: boolean;

  @Field({ description: "아이템 ID" })
  @IsNumber()
  @Min(1)
  itemId: number;
}

@InputType()
export class CreateContentSeeMoreRewardInput {
  @Field({ description: "아이템 ID" })
  @IsNumber()
  @Min(1)
  itemId: number;

  @Field(() => Float, { description: "획득 수량" })
  @IsNumber()
  @Min(0)
  quantity: number;
}

@ObjectType()
export class CreateContentResult extends MutationResult {}
