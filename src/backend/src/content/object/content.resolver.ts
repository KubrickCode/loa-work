import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { Content } from './content.object';
import { ContentReward } from './content-reward.object';
import { ContentType } from '@prisma/client';

@Resolver(() => Content)
export class ContentResolver {
  constructor(private prisma: PrismaService) {}

  @ResolveField(() => [ContentReward])
  async contentRewards(@Parent() content: Content) {
    return await this.prisma.contentReward.findMany({
      where: {
        contentId: content.id,
      },
    });
  }

  @ResolveField(() => String)
  async displayTypeName(@Parent() content: Content) {
    const typeNames = {
      [ContentType.CUBE]: '큐브',
      [ContentType.EPIC_RAID]: '에픽 레이드',
      [ContentType.GUARDIAN_RAID]: '가디언 토벌',
      [ContentType.KURZAN_FRONT]: '쿠르잔 전선',
      [ContentType.KAZEROS_RAID]: '카제로스 레이드',
      [ContentType.LEGION_COMMANDER_RAID]: '군단장 레이드',
    };

    return typeNames[content.type];
  }
}
