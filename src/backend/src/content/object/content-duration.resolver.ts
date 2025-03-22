import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { User } from 'src/common/object/user.object';
import { ContentDuration } from './content-duration.object';
import { UserContentDuration } from './user-content-duration.object';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Content } from './content.object';

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

  @UseGuards(AuthGuard)
  @ResolveField(() => UserContentDuration)
  async userContentDuration(
    @Parent() contentDuration: ContentDuration,
    @CurrentUser() user: User,
  ) {
    return await this.prisma.userContentDuration.findUniqueOrThrow({
      where: {
        contentDurationId_userId: {
          contentDurationId: contentDuration.id,
          userId: user.id,
        },
      },
    });
  }
}
