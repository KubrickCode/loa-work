import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class ContentFilter {
  @Field(() => Boolean, { nullable: true })
  includeIsBound?: boolean;
}

@ObjectType()
export class Content extends BaseObject {
  @Field(() => Int)
  contentCategoryId: number;

  @Field(() => ContentFilter, { nullable: true })
  filter?: ContentFilter;

  @Field(() => Int)
  duration: number;

  @Field(() => Int, { nullable: true })
  gate?: number;

  @Field(() => Boolean, { nullable: true })
  isSeeMore?: boolean;

  @Field(() => Int)
  level: number;

  @Field()
  name: string;
}
