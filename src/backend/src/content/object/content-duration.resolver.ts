import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { PrismaService } from "src/prisma";
import { ContentDuration } from "./content-duration.object";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { Content } from "./content.object";

@Resolver(() => ContentDuration)
export class ContentDurationResolver {
  constructor(private prisma: PrismaService) {}

  @UseGuards(AuthGuard)
  @ResolveField(() => Content)
  async content(@Parent() contentDuration: ContentDuration) {
    return await this.prisma.content.findUniqueOrThrow({
      where: { id: contentDuration.contentId },
    });
  }
}
