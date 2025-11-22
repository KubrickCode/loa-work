import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "src/auth/auth.guard";
import { ContentMutationResult, UpdateContentInput } from "../dto";
import { ContentService } from "../service/content.service";

@Resolver()
export class ContentUpdateMutation {
  constructor(private readonly contentService: ContentService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => ContentMutationResult)
  async contentUpdate(
    @Args("id", { type: () => Int }) id: number,
    @Args("input") input: UpdateContentInput
  ): Promise<ContentMutationResult> {
    await this.contentService.update(id, input);
    return { ok: true };
  }
}
