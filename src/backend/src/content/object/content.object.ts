import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class ContentWageFilter {
  @Field(() => Boolean, { nullable: true })
  includeIsBound?: boolean;

  @Field(() => Boolean, { nullable: true })
  includeIsSeeMore?: boolean;
}

@ObjectType()
export class Content extends BaseObject {
  @Field(() => Int)
  contentCategoryId: number;

  @Field(() => ContentWageFilter, { nullable: true })
  wageFilter?: ContentWageFilter;

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
