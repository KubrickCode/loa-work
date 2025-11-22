import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Content } from "./content.object";

@ObjectType()
export class ContentEdge {
  @Field(() => String, { description: "커서" })
  cursor: string;

  @Field(() => Content, { description: "노드" })
  node: Content;
}

@ObjectType()
export class ContentPageInfo {
  @Field(() => String, { description: "끝 커서", nullable: true })
  endCursor?: string;

  @Field(() => Boolean, { description: "다음 페이지 존재 여부" })
  hasNextPage: boolean;

  @Field(() => Boolean, { description: "이전 페이지 존재 여부" })
  hasPreviousPage: boolean;

  @Field(() => String, { description: "시작 커서", nullable: true })
  startCursor?: string;
}

@ObjectType()
export class ContentConnection {
  @Field(() => [ContentEdge], { description: "엣지 목록" })
  edges: ContentEdge[];

  @Field(() => ContentPageInfo, { description: "페이지 정보" })
  pageInfo: ContentPageInfo;

  @Field(() => Int, { description: "전체 개수" })
  totalCount: number;
}
