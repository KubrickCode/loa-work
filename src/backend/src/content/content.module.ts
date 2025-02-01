import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { ContentListQuery } from './query/content-list.query';
import { ContentResolver } from './object/content.resolver';
import { ContentRewardItemsQuery } from './query/content-reward-items.query';
import { ContentCategoriesQuery } from './query/content-categories.query';
import { ContentWageService } from './service/content-wage.service';
import { ContentQuery } from './query/content.query';
import { UserContentRewardsEditMutation } from './mutation/user-content-rewards-edit.mutation';
import { ContentRewardResolver } from './object/content-reward.resolver';
import { UserContentService } from '../user/service/user-content.service';
import { ContentWageListQuery } from './query/content-wage-list.query';
import { ContentWageResolver } from './object/content-wage.resolver';
import { ContentSeeMoreRewardResolver } from './object/content-see-more-reward.resolver';
import { UserContentDurationEditMutation } from './mutation/user-content-duration-edit.mutation';
import { ContentDurationResolver } from './object/content-duration.resolver';
import { ContentDurationQuery } from './query/content-duration.query';
import { UserGoldExchangeRateService } from 'src/user/service/user-gold-exchange-rate.service';
import { ContentRewardItemResolver } from './object/content-reward-item.resolver';
import { UserContentRewardItemEditMutation } from './mutation/user-content-reward-item-edit.mutation';
import { ContentRewardItemQuery } from './query/content-reward-item.query';
import { CustomContentWageCalculateMutation } from './mutation/custom-content-wage-calculate.mutation';

@Module({
  imports: [PrismaModule],
  providers: [
    ContentListQuery,
    ContentRewardItemsQuery,
    ContentResolver,
    ContentCategoriesQuery,
    ContentWageService,
    ContentQuery,
    UserContentRewardsEditMutation,
    ContentRewardResolver,
    UserContentService,
    ContentWageListQuery,
    ContentWageResolver,
    ContentSeeMoreRewardResolver,
    UserContentDurationEditMutation,
    ContentDurationResolver,
    ContentDurationQuery,
    UserGoldExchangeRateService,
    ContentRewardItemResolver,
    UserContentRewardItemEditMutation,
    ContentRewardItemQuery,
    CustomContentWageCalculateMutation,
  ],
})
export class ContentModule {}
