import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { ArrayMinSize, IsArray, IsNumber, Max, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { MutationResult } from "src/common/dto/mutation-result.dto";

@InputType()
export class EditContentDurationInput {
  @Field({ description: "컨텐츠 ID" })
  @IsNumber()
  @Min(1)
  contentId: number;

  @Field(() => Int, { description: "분" })
  @IsNumber()
  @Min(0)
  @Max(59)
  minutes: number;

  @Field(() => Int, { description: "초" })
  @IsNumber()
  @Min(0)
  @Max(59)
  seconds: number;
}

@ObjectType()
export class EditContentDurationResult extends MutationResult {}

@InputType()
export class EditContentDurationsDurationInput {
  @Field({ description: "컨텐츠 ID" })
  @IsNumber()
  @Min(1)
  contentId: number;

  @Field(() => Int, { description: "분" })
  @IsNumber()
  @Min(0)
  @Max(59)
  minutes: number;

  @Field(() => Int, { description: "초" })
  @IsNumber()
  @Min(0)
  @Max(59)
  seconds: number;
}

@InputType()
export class EditContentDurationsInput {
  @Field(() => [EditContentDurationsDurationInput], {
    description: "수정할 컨텐츠 소요 시간 목록",
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => EditContentDurationsDurationInput)
  contentDurations: EditContentDurationsDurationInput[];
}

@ObjectType()
export class EditContentDurationsResult extends MutationResult {}
