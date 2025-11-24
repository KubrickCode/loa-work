import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";
import { ArrayMinSize, IsArray, IsNumber, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@InputType()
export class EditContentSeeMoreRewardInput {
  @Field({ description: "컨텐츠 ID" })
  @IsNumber()
  @Min(1)
  contentId: number;

  @Field({ description: "아이템 ID" })
  @IsNumber()
  @Min(1)
  itemId: number;

  @Field(() => Float, { description: "획득 수량" })
  @IsNumber()
  @Min(0)
  quantity: number;
}

@InputType()
export class EditContentSeeMoreRewardsInput {
  @Field(() => [EditContentSeeMoreRewardInput], {
    description: "수정할 추가 보상(더보기) 목록",
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => EditContentSeeMoreRewardInput)
  contentSeeMoreRewards: EditContentSeeMoreRewardInput[];
}

@ObjectType()
export class EditContentSeeMoreRewardsResult {
  @Field(() => Boolean, { description: "성공 여부" })
  ok: boolean;
}
