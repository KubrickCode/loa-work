import { Args, Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "src/prisma";
import { ContentDuration } from "../object/content-duration.object";

@Resolver()
export class ContentDurationQuery {
  constructor(private prisma: PrismaService) {}

  @Query(() => ContentDuration)
  async contentDuration(@Args("id") id: number) {
    return await this.prisma.contentDuration.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
}
