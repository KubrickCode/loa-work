import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ContentCategory } from './content-category.object';
import { UserContentService } from '../../user/service/user-content.service';
import { DataLoaderService } from 'src/dataloader/data-loader.service';
import { ContentGroup } from './content-group.object';
import { Content } from './content.object';
import { PrismaService } from 'src/prisma';

@Resolver(() => ContentGroup)
export class ContentGroupResolver {
  constructor(
    private userContentService: UserContentService,
    private dataLoaderService: DataLoaderService,
    private prisma: PrismaService,
  ) {}

  @ResolveField(() => [Content])
  async contents(@Parent() contentGroup: ContentGroup) {
    return await this.prisma.content.findMany({
      where: {
        id: { in: contentGroup.contentIds },
      },
    });
  }

  @ResolveField(() => ContentCategory)
  async contentCategory(@Parent() contentGroup: ContentGroup) {
    return await this.dataLoaderService.contentCategory.findUniqueOrThrowById(
      contentGroup.contentCategoryId,
    );
  }

  @ResolveField(() => Number)
  async duration(@Parent() contentGroup: ContentGroup) {
    let duration = 0;

    for (const contentId of contentGroup.contentIds) {
      const contentDuration = await this.userContentService.getContentDuration(
        contentId,
      );
      duration += contentDuration;
    }

    return duration;
  }

  @ResolveField(() => String)
  async durationText(@Parent() contentGroup: ContentGroup) {
    const durationInSeconds = await this.duration(contentGroup);
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;

    return seconds === 0 ? `${minutes}분` : `${minutes}분 ${seconds}초`;
  }
}
