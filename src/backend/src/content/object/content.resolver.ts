import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { Content } from './content.object';
import { ContentReward } from './content-reward.object';
import { ContentCategory } from './content-category.object';
import { UserContentService } from '../../user/service/user-content.service';
import { ContentSeeMoreReward } from './content-see-more-reward.object';
import { ContentDuration } from './content-duration.object';

@Resolver(() => Content)
export class ContentResolver {
  constructor(
    private prisma: PrismaService,
    private userContentService: UserContentService,
  ) {}

  @ResolveField(() => ContentCategory)
  async contentCategory(@Parent() content: Content) {
    return await this.prisma.contentCategory.findUniqueOrThrow({
      where: {
        id: content.contentCategoryId,
      },
    });
  }

  @ResolveField(() => ContentDuration)
  async contentDuration(@Parent() content: Content) {
    return await this.prisma.contentDuration.findUniqueOrThrow({
      where: {
        contentId: content.id,
      },
    });
  }

  @ResolveField(() => [ContentReward])
  async contentRewards(@Parent() content: Content) {
    return await this.prisma.contentReward.findMany({
      where: {
        contentId: content.id,
      },
    });
  }

  @ResolveField(() => [ContentSeeMoreReward])
  async contentSeeMoreRewards(@Parent() content: Content) {
    return await this.prisma.contentSeeMoreReward.findMany({
      where: {
        contentId: content.id,
      },
    });
  }

  @ResolveField(() => String)
  async displayName(@Parent() content: Content) {
    const { gate, name } = content;
    return `${name}${gate ? ` ${gate}관문` : ''}`;
  }

  @ResolveField(() => Number)
  async duration(@Parent() content: Content) {
    return await this.userContentService.getContentDuration(content.id);
  }

  @ResolveField(() => String)
  async durationText(@Parent() content: Content) {
    const durationInSeconds = await this.duration(content);
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;

    return seconds === 0 ? `${minutes}분` : `${minutes}분 ${seconds}초`;
  }
}
