import { Field, Float, ObjectType } from "@nestjs/graphql";
import { ContentGroup } from "./content-group.object";

@ObjectType()
export class ContentGroupWage {
  @Field(() => ContentGroup)
  contentGroup: ContentGroup;

  @Field(() => Float)
  goldAmountPerClear: number;

  @Field(() => Float)
  goldAmountPerHour: number;

  @Field(() => Float)
  krwAmountPerHour: number;
}
