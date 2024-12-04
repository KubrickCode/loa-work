import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { ContentListQuery } from './query/content-list.query';
import { ContentResolver } from './object/content.resolver';
import { ContentRewardItemsQuery } from './query/content-reward-items.query';
import { ItemPriceService } from '../item/service/item-price.service';
import { ContentCategoriesQuery } from './query/content-categories.query';
import { ContentWageService } from './service/content-wage.service';
import { ContentQuery } from './query/content.query';
import { ContentRewardsEditMutation } from './mutation/content-rewards-edit.mutation';

@Module({
  imports: [PrismaModule],
  providers: [
    ContentListQuery,
    ContentRewardItemsQuery,
    ContentResolver,
    ItemPriceService,
    ContentCategoriesQuery,
    ContentWageService,
    ContentQuery,
    ContentRewardsEditMutation,
  ],
})
export class ContentModule {}
