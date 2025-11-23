import { Field, Float, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
} from "class-validator";

@InputType()
export class RewardFilterArgs {
  @Field(() => Int, { description: "컨텐츠 ID" })
  @IsInt()
  contentId: number;

  @Field(() => Boolean, {
    description: "더보기 보상 포함 여부",
    nullable: true,
  })
  @IsBoolean()
  @IsOptional()
  includeSeeMore?: boolean;
}

@InputType()
export class ContentRewardEditInput {
  @Field(() => Float, { description: "평균 획득 수량" })
  @IsNumber()
  @Min(0)
  averageQuantity: number;

  @Field(() => Int, { description: "컨텐츠 ID" })
  @IsInt()
  contentId: number;

  @Field(() => Boolean, { description: "거래 가능 여부" })
  @IsBoolean()
  isSellable: boolean;

  @Field(() => Int, { description: "아이템 ID" })
  @IsInt()
  itemId: number;
}

@InputType()
export class ContentRewardsEditInput {
  @Field(() => [ContentRewardEditInput], { description: "컨텐츠 보상 목록" })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContentRewardEditInput)
  contentRewards: ContentRewardEditInput[];

  @Field(() => Boolean, { description: "제보 가능 여부" })
  @IsBoolean()
  isReportable: boolean;
}

@ObjectType()
export class ContentRewardsEditResult {
  @Field(() => Boolean, { description: "성공 여부" })
  ok: boolean;
}

@InputType()
export class ContentRewardReportInput {
  @Field(() => Float, { description: "제보할 평균 획득 수량" })
  @IsNumber()
  @Min(0)
  averageQuantity: number;

  @Field(() => Int, { description: "컨텐츠 보상 ID" })
  @IsInt()
  id: number;
}

@InputType()
export class ContentRewardsReportInput {
  @Field(() => [ContentRewardReportInput], { description: "제보할 보상 목록" })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContentRewardReportInput)
  contentRewards: ContentRewardReportInput[];
}

@ObjectType()
export class ContentRewardsReportResult {
  @Field(() => Boolean, { description: "성공 여부" })
  ok: boolean;
}
