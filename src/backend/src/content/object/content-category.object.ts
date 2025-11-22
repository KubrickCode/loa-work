import { Field, ObjectType } from "@nestjs/graphql";
import { BaseObject } from "src/common/object/base.object";

@ObjectType()
export class ContentCategory extends BaseObject {
  @Field(() => String, { description: "이미지 URL" })
  imageUrl: string;

  @Field(() => String, { description: "이름" })
  name: string;
}
