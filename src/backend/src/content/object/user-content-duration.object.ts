import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class UserContentDuration extends BaseObject {
  @Field(() => Int)
  contentDurationId: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  value: number;
}
