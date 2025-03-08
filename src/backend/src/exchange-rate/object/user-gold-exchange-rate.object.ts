import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class UserGoldExchangeRate extends BaseObject {
  @Field(() => Float)
  krwAmount: number;

  @Field(() => Float)
  goldAmount: number;

  @Field()
  userId: number;
}
