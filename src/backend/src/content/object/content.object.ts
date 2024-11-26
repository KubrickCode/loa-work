import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ContentType } from '@prisma/client';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class Content extends BaseObject {
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

  @Field(() => ContentType)
  type: ContentType;
}
