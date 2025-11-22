import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "src/auth/auth.guard";
import { ContentMutationResult } from "../dto";
import { ContentService } from "../service/content.service";

@Resolver()
export class ContentDeleteMutation {
  constructor(private readonly contentService: ContentService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => ContentMutationResult)
  async contentDelete(@Args("id", { type: () => Int }) id: number): Promise<ContentMutationResult> {
    await this.contentService.delete(id);
    return { ok: true };
  }
}
