import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { PrismaService } from "src/prisma";
import { ContentWage } from "./content-wage.object";
import { Content } from "./content.object";

@Resolver(() => ContentWage)
export class ContentWageResolver {
  constructor(private prisma: PrismaService) {}

  @ResolveField(() => Content)
  async content(@Parent() contentWage: ContentWage) {
    return await this.prisma.content.findUniqueOrThrow({
      where: {
        id: contentWage.contentId,
      },
    });
  }
}
