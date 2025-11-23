import { Field, Float, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ContentGroup {
  @Field()
  contentCategoryId: number;

  @Field(() => [Number])
  contentIds: number[];

  @Field()
  level: number;

  @Field()
  name: string;
}

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
