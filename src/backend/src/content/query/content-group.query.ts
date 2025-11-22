import { Args, Field, InputType, Int, Query, Resolver } from "@nestjs/graphql";
import { ContentGroup } from "../object/content-group.object";
import { ContentGroupService } from "../service/content-group.service";

@InputType()
export class ContentGroupFilter {
  @Field(() => [Int], { nullable: true })
  contentIds?: number[];
}

@Resolver()
export class ContentGroupQuery {
  constructor(private readonly contentGroupService: ContentGroupService) {}

  @Query(() => ContentGroup)
  async contentGroup(
    @Args("filter", { nullable: true }) filter?: ContentGroupFilter
  ): Promise<ContentGroup> {
    return this.contentGroupService.findOne(filter || {});
  }
}
