import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { User } from 'src/common/object/user.object';
import { ContentDuration } from './content-duration.object';
import { UserContentDuration } from './user-content-duration.object';

@Resolver(() => ContentDuration)
export class ContentDurationResolver {
  constructor(private prisma: PrismaService) {}

  @ResolveField(() => UserContentDuration)
  async userContentDuration(
    @Parent() contentDuration: ContentDuration,
    @CurrentUser() user?: User,
  ) {
    if (!user) throw new Error('User is not logged in');

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
