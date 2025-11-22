import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ isAbstract: true })
export abstract class Connection<T> {
  abstract edges: Edge<T>[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType({ isAbstract: true })
export abstract class Edge<T> {
  @Field(() => String)
  cursor: string;

  abstract node: T;
}

@ObjectType()
export class PageInfo {
  @Field(() => String, { nullable: true })
  endCursor?: string;

  @Field()
  hasNextPage: boolean;

  @Field()
  hasPreviousPage: boolean;

  @Field(() => String, { nullable: true })
  startCursor?: string;
}
