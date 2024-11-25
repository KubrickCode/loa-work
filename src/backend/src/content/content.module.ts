import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { ContentListQuery } from './query/content-list.query';
import { ContentResolver } from './object/content.resolver';
import { ContentRewardViewListQuery } from './query/content-reward-view-list.query';

@Module({
  imports: [PrismaModule],
  providers: [ContentListQuery, ContentRewardViewListQuery, ContentResolver],
})
export class ContentModule {}
