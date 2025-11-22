import { Field, Float, InputType, Int, ObjectType } from "@nestjs/graphql";
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";
import { ContentStatus } from "@prisma/client";

@InputType()
export class ContentFilterArgs {
  @Field(() => Int, { description: "컨텐츠 카테고리 ID", nullable: true })
  @IsInt()
  @IsOptional()
  categoryId?: number;

  @Field(() => Int, { description: "관문", nullable: true })
  @IsInt()
  @IsOptional()
  gate?: number;

  @Field(() => Int, { description: "레벨", nullable: true })
  @IsInt()
  @IsOptional()
  level?: number;

  @Field(() => String, { description: "이름", nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => ContentStatus, { description: "상태", nullable: true })
  @IsEnum(ContentStatus)
  @IsOptional()
  status?: ContentStatus;
}

@InputType("ContentCreateInput")
export class CreateContentInput {
  @Field(() => Int, { description: "컨텐츠 카테고리 ID" })
  @IsInt()
  @IsNotEmpty()
  categoryId: number;

  @Field(() => [ContentRewardInput], { description: "컨텐츠 보상 목록" })
  contentRewards: ContentRewardInput[];

  @Field(() => [ContentSeeMoreRewardInput], {
    description: "더보기 컨텐츠 보상 목록",
    nullable: true,
  })
  @IsOptional()
  contentSeeMoreRewards?: ContentSeeMoreRewardInput[];

  @Field(() => Int, { description: "소요 시간 (초 단위)" })
  @IsInt()
  @Min(1)
  duration: number;

  @Field(() => Int, { description: "관문", nullable: true })
  @IsInt()
  @IsOptional()
  gate?: number;

  @Field(() => Int, { description: "레벨" })
  @IsInt()
  @Min(1)
  level: number;

  @Field(() => String, { description: "이름" })
  @IsString()
  @IsNotEmpty()
  name: string;
}

@InputType()
export class UpdateContentInput {
  @Field(() => Int, { description: "관문", nullable: true })
  @IsInt()
  @IsOptional()
  gate?: number;

  @Field(() => Int, { description: "레벨", nullable: true })
  @IsInt()
  @Min(1)
  @IsOptional()
  level?: number;

  @Field(() => String, { description: "이름", nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => ContentStatus, { description: "상태", nullable: true })
  @IsEnum(ContentStatus)
  @IsOptional()
  status?: ContentStatus;
}

@InputType("ContentCreateItemInput")
export class ContentRewardInput {
  @Field(() => Float, { description: "평균 획득 수량" })
  @IsNumber()
  @Min(0)
  averageQuantity: number;

  @Field(() => Boolean, { description: "귀속 여부" })
  @IsBoolean()
  isBound: boolean;

  @Field(() => Int, { description: "아이템 ID" })
  @IsInt()
  itemId: number;
}

@InputType("ContentCreateSeeMoreRewardInput")
export class ContentSeeMoreRewardInput {
  @Field(() => Int, { description: "아이템 ID" })
  @IsInt()
  itemId: number;

  @Field(() => Float, { description: "수량" })
  @IsNumber()
  @Min(0)
  quantity: number;
}

@ObjectType("ContentCreateResult")
export class ContentMutationResult {
  @Field(() => Boolean, { description: "성공 여부" })
  ok: boolean;
}

// Legacy alias for backward compatibility
export { CreateContentInput as ContentCreateInput };
export { ContentRewardInput as ContentCreateItemInput };
export { ContentSeeMoreRewardInput as ContentCreateSeeMoreRewardInput };
export { ContentMutationResult as ContentCreateResult };
