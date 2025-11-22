import { Args, Field, InputType, Int, Query, Resolver } from "@nestjs/graphql";
import { Content } from "../object/content.object";
import { ContentStatus } from "@prisma/client";
import { ContentService } from "../service/content.service";
import { ContentFilterArgs } from "../dto";

@InputType()
export class ContentListFilter {
  @Field(() => Int, { nullable: true })
  contentCategoryId?: number;

  @Field(() => Boolean, { nullable: true })
  includeIsSeeMore?: boolean;

  @Field(() => String, { nullable: true })
  keyword?: string;

  @Field(() => ContentStatus, { nullable: true })
  status?: ContentStatus;
}

@Resolver()
export class ContentListQuery {
  constructor(private readonly contentService: ContentService) {}

  @Query(() => [Content])
  async contentList(
    @Args("filter", { nullable: true }) filter?: ContentListFilter
  ): Promise<Content[]> {
    const filterArgs: ContentFilterArgs | undefined = filter
      ? {
          categoryId: filter.contentCategoryId,
          name: filter.keyword,
          status: filter.status,
        }
      : undefined;

    return this.contentService.findAll(filterArgs);
  }
}
