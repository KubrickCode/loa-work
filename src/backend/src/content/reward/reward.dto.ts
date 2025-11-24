import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";
import { ArrayMinSize, IsArray, IsBoolean, IsNumber, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@InputType()
export class EditContentRewardInput {
  @Field(() => Float, { description: "평균 획득 수량" })
  @IsNumber()
  @Min(0)
  averageQuantity: number;

  @Field({ description: "컨텐츠 ID" })
  @IsNumber()
  @Min(1)
  contentId: number;

  @Field(() => Boolean, { description: "거래 가능 여부" })
  @IsBoolean()
  isSellable: boolean;

  @Field({ description: "아이템 ID" })
  @IsNumber()
  @Min(1)
  itemId: number;
}

@InputType()
export class EditContentRewardsInput {
  @Field(() => [EditContentRewardInput], {
    description: "수정할 컨텐츠 보상 목록",
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => EditContentRewardInput)
  contentRewards: EditContentRewardInput[];

  @Field({ description: "제보 가능 여부" })
  @IsBoolean()
  isReportable: boolean;
}

@ObjectType()
export class EditContentRewardsResult {
  @Field(() => Boolean, { description: "성공 여부" })
  ok: boolean;
}

@InputType()
export class ReportContentRewardInput {
  @Field(() => Float, { description: "평균 획득 수량" })
  @IsNumber()
  @Min(0)
  averageQuantity: number;

  @Field({ description: "컨텐츠 보상 ID" })
  @IsNumber()
  @Min(1)
  id: number;
}

@InputType()
export class ReportContentRewardsInput {
  @Field(() => [ReportContentRewardInput], {
    description: "제보할 컨텐츠 보상 목록",
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ReportContentRewardInput)
  contentRewards: ReportContentRewardInput[];
}

@ObjectType()
export class ReportContentRewardsResult {
  @Field(() => Boolean, { description: "성공 여부" })
  ok: boolean;
}
