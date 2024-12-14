import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class UserGoldExchangeRate extends BaseObject {
  @Field(() => Int)
  krwAmount: number;

  @Field(() => Int)
  goldAmount: number;

  @Field(() => Int)
  userId: number;
}
