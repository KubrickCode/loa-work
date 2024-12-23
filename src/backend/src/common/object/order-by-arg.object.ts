import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class OrderByArg {
  @Field()
  field: string;

  @Field(() => String)
  order: Prisma.SortOrder;
}
