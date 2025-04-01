import { Field, ObjectType } from '@nestjs/graphql';

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
