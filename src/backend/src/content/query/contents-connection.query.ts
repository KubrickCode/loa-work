import { Args, Query, Resolver } from "@nestjs/graphql";
import { ContentConnection } from "../object/content-connection.object";
import { ContentService } from "../service/content.service";
import { ConnectionArgs } from "../args/connection.args";
import { ContentFilterArgs } from "../dto";

@Resolver()
export class ContentsConnectionQuery {
  constructor(private readonly contentService: ContentService) {}

  @Query(() => ContentConnection)
  async contentsConnection(
    @Args() args: ConnectionArgs,
    @Args("filter", { nullable: true }) filter?: ContentFilterArgs
  ): Promise<ContentConnection> {
    return this.contentService.findConnection(args, filter);
  }
}
