import { Field, ObjectType } from '@nestjs/graphql';
import { BaseObject } from './base.object';
import { AuthProvider, UserRole } from '@prisma/client';

@ObjectType()
export class User extends BaseObject {
  @Field()
  displayName: string;

  @Field()
  email: string;

  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Field(() => AuthProvider)
  provider: AuthProvider;

  @Field()
  refId: string;

  @Field(() => UserRole)
  role: UserRole;
}
