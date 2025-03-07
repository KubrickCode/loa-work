import { Field, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class UserGoldExchangeRate extends BaseObject {
  @Field()
  krwAmount: number;

  @Field()
  goldAmount: number;

  @Field()
  userId: number;
}
