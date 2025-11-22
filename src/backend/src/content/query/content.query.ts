import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { Content } from "../object/content.object";
import { ContentService } from "../service/content.service";

@Resolver()
export class ContentQuery {
  constructor(private readonly contentService: ContentService) {}

  @Query(() => Content)
  async content(@Args("id", { type: () => Int }) id: number): Promise<Content> {
    return this.contentService.findUniqueOrThrow(id);
  }
}
