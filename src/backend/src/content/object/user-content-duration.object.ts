import { Field, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class UserContentDuration extends BaseObject {
  @Field()
  contentDurationId: number;

  @Field()
  userId: number;

  @Field()
  value: number;
}
