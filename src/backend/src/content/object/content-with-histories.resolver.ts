import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { ContentWithHistories } from './content-with-histories.object';
import { Content } from './content.object';

@Resolver(() => ContentWithHistories)
export class ContentWithHistoriesResolver {
  constructor(private prisma: PrismaService) {}

  @ResolveField(() => Content)
  async content(@Parent() contentWithHistories: ContentWithHistories) {
    return await this.prisma.content.findUniqueOrThrow({
      where: {
        id: contentWithHistories.contentId,
      },
    });
  }
}
