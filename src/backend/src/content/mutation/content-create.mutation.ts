import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "src/auth/auth.guard";
import { ContentCreateInput, ContentCreateResult } from "../dto";
import { ContentService } from "../service/content.service";

@Resolver()
export class ContentCreateMutation {
  constructor(private readonly contentService: ContentService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => ContentCreateResult)
  async contentCreate(@Args("input") input: ContentCreateInput): Promise<ContentCreateResult> {
    await this.contentService.create(input);
    return { ok: true };
  }
}
