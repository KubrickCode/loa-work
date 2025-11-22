import { Args, Query, Resolver } from "@nestjs/graphql";
import { Content } from "../object/content.object";
import { ContentsFilter } from "../dto";
import { ContentService } from "../service/content.service";

@Resolver()
export class ContentsQuery {
  constructor(private readonly contentService: ContentService) {}

  @Query(() => [Content])
  async contents(@Args("filter", { nullable: true }) filter?: ContentsFilter): Promise<Content[]> {
    return this.contentService.findAll(filter ? { ids: filter.ids } : undefined);
  }
}
