import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { ContentListQuery } from './query/content-list.query';
import { ContentResolver } from './object/content.resolver';
import { ContentRewardItemsQuery } from './query/content-reward-items.query';
import { ContentCategoriesQuery } from './query/content-categories.query';
import { ContentWageService } from './service/content-wage.service';
import { ContentQuery } from './query/content.query';
import { ContentRewardsEditMutation } from './mutation/content-rewards-edit.mutation';
import { ContentRewardResolver } from './object/content-reward.resolver';
import { UserContentService } from './service/user-content.service';
import { ContentWageListQuery } from './query/content-wage-list.query';
import { ContentWageResolver } from './object/content-wage.resolver';

@Module({
  imports: [PrismaModule],
  providers: [
    ContentListQuery,
    ContentRewardItemsQuery,
    ContentResolver,
    ContentCategoriesQuery,
    ContentWageService,
    ContentQuery,
    ContentRewardsEditMutation,
    ContentRewardResolver,
    UserContentService,
    ContentWageListQuery,
    ContentWageResolver,
  ],
})
export class ContentModule {}
