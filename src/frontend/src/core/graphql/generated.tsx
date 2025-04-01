import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: Date; output: Date; }
};

export type AuctionItem = {
  __typename?: 'AuctionItem';
  avgBuyPrice: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  imageUrl: Scalars['String']['output'];
  isStatScraperEnabled: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AuctionItemListFilter = {
  isStatScraperEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  nameKeyword?: InputMaybe<Scalars['String']['input']>;
};

export enum AuthProvider {
  DISCORD = 'DISCORD',
  GOOGLE = 'GOOGLE',
  KAKAO = 'KAKAO'
}

export type Content = {
  __typename?: 'Content';
  contentCategory: ContentCategory;
  contentCategoryId: Scalars['Int']['output'];
  contentDuration: ContentDuration;
  contentRewards: Array<ContentReward>;
  contentSeeMoreRewards: Array<ContentSeeMoreReward>;
  createdAt: Scalars['DateTime']['output'];
  displayName: Scalars['String']['output'];
  duration: Scalars['Int']['output'];
  durationText: Scalars['String']['output'];
  gate?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  level: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  wage: ContentWage;
  wageFilter?: Maybe<ContentObjectWageFilter>;
};


export type ContentWageArgs = {
  filter?: InputMaybe<ContentWageFilter>;
};

export type ContentCategory = {
  __typename?: 'ContentCategory';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ContentCreateInput = {
  categoryId: Scalars['Int']['input'];
  contentRewards: Array<ContentCreateRewardItemsInput>;
  contentSeeMoreRewards?: InputMaybe<Array<ContentCreateSeeMoreRewardsInput>>;
  duration: Scalars['Int']['input'];
  gate?: InputMaybe<Scalars['Int']['input']>;
  level: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type ContentCreateResult = {
  __typename?: 'ContentCreateResult';
  ok: Scalars['Boolean']['output'];
};

export type ContentCreateRewardItemsInput = {
  contentRewardItemId: Scalars['Int']['input'];
  defaultAverageQuantity: Scalars['Float']['input'];
  isExcluded: Scalars['Boolean']['input'];
  isSellable: Scalars['Boolean']['input'];
};

export type ContentCreateSeeMoreRewardsInput = {
  contentRewardItemId: Scalars['Int']['input'];
  isExcluded: Scalars['Boolean']['input'];
  quantity: Scalars['Float']['input'];
};

export type ContentDuration = {
  __typename?: 'ContentDuration';
  content: Content;
  contentId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  defaultValue: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userContentDuration: UserContentDuration;
};

export type ContentGroup = {
  __typename?: 'ContentGroup';
  contentCategory: ContentCategory;
  contentCategoryId: Scalars['Int']['output'];
  contentIds: Array<Scalars['Int']['output']>;
  contents: Array<Content>;
  duration: Scalars['Int']['output'];
  durationText: Scalars['String']['output'];
  level: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type ContentGroupFilter = {
  contentIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type ContentGroupWage = {
  __typename?: 'ContentGroupWage';
  contentGroup: ContentGroup;
  goldAmountPerClear: Scalars['Float']['output'];
  goldAmountPerHour: Scalars['Float']['output'];
  krwAmountPerHour: Scalars['Float']['output'];
};

export type ContentGroupWageListFilter = {
  contentCategoryId?: InputMaybe<Scalars['Int']['input']>;
  includeContentRewardItemIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  includeIsBound?: InputMaybe<Scalars['Boolean']['input']>;
  includeIsSeeMore?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
};

export type ContentListFilter = {
  contentCategoryId?: InputMaybe<Scalars['Int']['input']>;
  includeIsSeeMore?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
};

export type ContentObjectWageFilter = {
  __typename?: 'ContentObjectWageFilter';
  includeContentRewardItems?: Maybe<Array<Scalars['String']['output']>>;
  includeIsBound?: Maybe<Scalars['Boolean']['output']>;
  includeIsSeeMore?: Maybe<Scalars['Boolean']['output']>;
};

export type ContentReward = {
  __typename?: 'ContentReward';
  averageQuantity: Scalars['Float']['output'];
  contentRewardItem: ContentRewardItem;
  contentRewardItemId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isSellable: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userContentReward: UserContentReward;
};

export type ContentRewardItem = {
  __typename?: 'ContentRewardItem';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  imageUrl: Scalars['String']['output'];
  kind: ContentRewardItemKind;
  name: Scalars['String']['output'];
  pieColor: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userContentRewardItem: UserContentRewardItem;
};

export enum ContentRewardItemKind {
  AUCTION_ITEM = 'AUCTION_ITEM',
  EXTRA_ITEM = 'EXTRA_ITEM',
  MARKET_ITEM = 'MARKET_ITEM'
}

export type ContentRewardItemsFilter = {
  excludeItemName?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<ContentRewardItemKind>;
};

export type ContentRewardReportInput = {
  averageQuantity: Scalars['Float']['input'];
  id: Scalars['Int']['input'];
};

export type ContentRewardsReportInput = {
  contentRewards: Array<ContentRewardReportInput>;
};

export type ContentRewardsReportResult = {
  __typename?: 'ContentRewardsReportResult';
  ok: Scalars['Boolean']['output'];
};

export type ContentSeeMoreReward = {
  __typename?: 'ContentSeeMoreReward';
  contentId: Scalars['Int']['output'];
  contentRewardItem: ContentRewardItem;
  contentRewardItemId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  quantity: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userContentSeeMoreReward: UserContentSeeMoreReward;
};

export type ContentWage = {
  __typename?: 'ContentWage';
  content: Content;
  contentId: Scalars['Int']['output'];
  goldAmountPerClear: Scalars['Float']['output'];
  goldAmountPerHour: Scalars['Float']['output'];
  krwAmountPerHour: Scalars['Float']['output'];
};

export type ContentWageFilter = {
  includeContentRewardItemIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  includeIsBound?: InputMaybe<Scalars['Boolean']['input']>;
  includeIsSeeMore?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContentWageListFilter = {
  contentCategoryId?: InputMaybe<Scalars['Int']['input']>;
  includeContentRewardItemIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  includeIsBound?: InputMaybe<Scalars['Boolean']['input']>;
  includeIsSeeMore?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
};

export type ContentsFilter = {
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type CustomContentWageCalculateInput = {
  minutes: Scalars['Int']['input'];
  rewardItems: Array<CustomContentWageCalculateRewardItemInput>;
  seconds: Scalars['Int']['input'];
};

export type CustomContentWageCalculateResult = {
  __typename?: 'CustomContentWageCalculateResult';
  goldAmountPerClear: Scalars['Int']['output'];
  goldAmountPerHour: Scalars['Int']['output'];
  krwAmountPerHour: Scalars['Int']['output'];
  ok: Scalars['Boolean']['output'];
};

export type CustomContentWageCalculateRewardItemInput = {
  id: Scalars['Int']['input'];
  quantity: Scalars['Float']['input'];
};

export type MarketItem = {
  __typename?: 'MarketItem';
  bundleCount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  currentMinPrice: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  imageUrl: Scalars['String']['output'];
  isStatScraperEnabled: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  recentPrice: Scalars['Int']['output'];
  refId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  yDayAvgPrice: Scalars['Float']['output'];
};

export type MarketItemListFilter = {
  categoryName?: InputMaybe<Scalars['String']['input']>;
  grade?: InputMaybe<Scalars['String']['input']>;
  isStatScraperEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  contentCreate: ContentCreateResult;
  contentRewardsReport: ContentRewardsReportResult;
  customContentWageCalculate: CustomContentWageCalculateResult;
  userContentDurationEdit: UserContentDurationEditResult;
  userContentDurationsEdit: UserContentDurationsEditResult;
  userContentRewardItemEdit: UserContentRewardItemEditResult;
  userContentRewardsEdit: UserContentRewardsEditResult;
  userContentSeeMoreRewardsEdit: UserContentSeeMoreRewardsEditResult;
  userGoldExchangeRateEdit: UserGoldExchangeRateEditResult;
};


export type MutationContentCreateArgs = {
  input: ContentCreateInput;
};


export type MutationContentRewardsReportArgs = {
  input: ContentRewardsReportInput;
};


export type MutationCustomContentWageCalculateArgs = {
  input: CustomContentWageCalculateInput;
};


export type MutationUserContentDurationEditArgs = {
  input: UserContentDurationEditInput;
};


export type MutationUserContentDurationsEditArgs = {
  input: UserContentDurationsEditInput;
};


export type MutationUserContentRewardItemEditArgs = {
  input: UserContentRewardItemEditInput;
};


export type MutationUserContentRewardsEditArgs = {
  input: UserContentRewardsEditInput;
};


export type MutationUserContentSeeMoreRewardsEditArgs = {
  input: UserContentSeeMoreRewardsEditInput;
};


export type MutationUserGoldExchangeRateEditArgs = {
  input: UserGoldExchangeRateEditInput;
};

export type OrderByArg = {
  field: Scalars['String']['input'];
  order: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  auctionItemList: Array<AuctionItem>;
  auctionItems: Array<AuctionItem>;
  content: Content;
  contentCategories: Array<ContentCategory>;
  contentDuration: ContentDuration;
  contentGroup: ContentGroup;
  contentGroupWageList: Array<ContentGroupWage>;
  contentList: Array<Content>;
  contentRewardItem: ContentRewardItem;
  contentRewardItems: Array<ContentRewardItem>;
  contentWageList: Array<ContentWage>;
  contents: Array<Content>;
  goldExchangeRate: UserGoldExchangeRate;
  marketItemList: Array<MarketItem>;
  marketItems: Array<MarketItem>;
  userGoldExchangeRate: UserGoldExchangeRate;
  userList: Array<User>;
};


export type QueryAuctionItemListArgs = {
  filter?: InputMaybe<AuctionItemListFilter>;
};


export type QueryAuctionItemsArgs = {
  orderBy?: InputMaybe<Array<OrderByArg>>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryContentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryContentDurationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryContentGroupArgs = {
  filter?: InputMaybe<ContentGroupFilter>;
};


export type QueryContentGroupWageListArgs = {
  filter?: InputMaybe<ContentGroupWageListFilter>;
  orderBy?: InputMaybe<Array<OrderByArg>>;
};


export type QueryContentListArgs = {
  filter?: InputMaybe<ContentListFilter>;
};


export type QueryContentRewardItemArgs = {
  id: Scalars['Int']['input'];
};


export type QueryContentRewardItemsArgs = {
  filter?: InputMaybe<ContentRewardItemsFilter>;
};


export type QueryContentWageListArgs = {
  filter?: InputMaybe<ContentWageListFilter>;
  orderBy?: InputMaybe<Array<OrderByArg>>;
};


export type QueryContentsArgs = {
  filter?: InputMaybe<ContentsFilter>;
};


export type QueryMarketItemListArgs = {
  filter?: InputMaybe<MarketItemListFilter>;
};


export type QueryMarketItemsArgs = {
  orderBy?: InputMaybe<Array<OrderByArg>>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  displayName: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  provider: AuthProvider;
  refId: Scalars['String']['output'];
  role: UserRole;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserContentDuration = {
  __typename?: 'UserContentDuration';
  contentDurationId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
  value: Scalars['Int']['output'];
};

export type UserContentDurationEditInput = {
  id: Scalars['Int']['input'];
  minutes: Scalars['Int']['input'];
  seconds: Scalars['Int']['input'];
};

export type UserContentDurationEditResult = {
  __typename?: 'UserContentDurationEditResult';
  ok: Scalars['Boolean']['output'];
};

export type UserContentDurationsEditInput = {
  contentDurations: Array<UserContentDurationsEditInputDuration>;
};

export type UserContentDurationsEditInputDuration = {
  id: Scalars['Int']['input'];
  minutes: Scalars['Int']['input'];
  seconds: Scalars['Int']['input'];
};

export type UserContentDurationsEditResult = {
  __typename?: 'UserContentDurationsEditResult';
  ok: Scalars['Boolean']['output'];
};

export type UserContentReward = {
  __typename?: 'UserContentReward';
  averageQuantity: Scalars['Float']['output'];
  contentRewardId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
};

export type UserContentRewardEditInput = {
  averageQuantity: Scalars['Float']['input'];
  id: Scalars['Int']['input'];
};

export type UserContentRewardItem = {
  __typename?: 'UserContentRewardItem';
  contentRewardItemId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  price: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
};

export type UserContentRewardItemEditInput = {
  id: Scalars['Int']['input'];
  price: Scalars['Float']['input'];
};

export type UserContentRewardItemEditResult = {
  __typename?: 'UserContentRewardItemEditResult';
  ok: Scalars['Boolean']['output'];
};

export type UserContentRewardsEditInput = {
  isReportable: Scalars['Boolean']['input'];
  userContentRewards: Array<UserContentRewardEditInput>;
};

export type UserContentRewardsEditResult = {
  __typename?: 'UserContentRewardsEditResult';
  ok: Scalars['Boolean']['output'];
};

export type UserContentSeeMoreReward = {
  __typename?: 'UserContentSeeMoreReward';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  quantity: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UserContentSeeMoreRewardEditInput = {
  id: Scalars['Int']['input'];
  quantity: Scalars['Float']['input'];
};

export type UserContentSeeMoreRewardsEditInput = {
  userContentSeeMoreRewards: Array<UserContentSeeMoreRewardEditInput>;
};

export type UserContentSeeMoreRewardsEditResult = {
  __typename?: 'UserContentSeeMoreRewardsEditResult';
  ok: Scalars['Boolean']['output'];
};

export type UserGoldExchangeRate = {
  __typename?: 'UserGoldExchangeRate';
  createdAt: Scalars['DateTime']['output'];
  goldAmount: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  krwAmount: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
};

export type UserGoldExchangeRateEditInput = {
  id: Scalars['Int']['input'];
  krwAmount: Scalars['Int']['input'];
};

export type UserGoldExchangeRateEditResult = {
  __typename?: 'UserGoldExchangeRateEditResult';
  ok: Scalars['Boolean']['output'];
};

export enum UserRole {
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
  USER = 'USER'
}

export type ContentCreateTabDataQueryVariables = Exact<{ [key: string]: never; }>;


export type ContentCreateTabDataQuery = { __typename?: 'Query', contentCategories: Array<{ __typename?: 'ContentCategory', id: number, name: string }>, contentRewardItems: Array<{ __typename?: 'ContentRewardItem', id: number, name: string }> };

export type ContentCreateTabMutationVariables = Exact<{
  input: ContentCreateInput;
}>;


export type ContentCreateTabMutation = { __typename?: 'Mutation', contentCreate: { __typename?: 'ContentCreateResult', ok: boolean } };

export type PredictRewardsTabQueryVariables = Exact<{ [key: string]: never; }>;


export type PredictRewardsTabQuery = { __typename?: 'Query', contentCategories: Array<{ __typename?: 'ContentCategory', id: number, name: string }> };

export type UserListTabQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type UserListTabQueryQuery = { __typename?: 'Query', userList: Array<{ __typename?: 'User', displayName: string, email?: string | null, imageUrl?: string | null, provider: AuthProvider, refId: string }> };

export type ValidateRewardsTabQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidateRewardsTabQuery = { __typename?: 'Query', contentList: Array<{ __typename?: 'Content', id: number, level: number, contentCategory: { __typename?: 'ContentCategory', name: string } }> };

export type ContentRewardListPieChartQueryVariables = Exact<{
  filter?: InputMaybe<ContentListFilter>;
}>;


export type ContentRewardListPieChartQuery = { __typename?: 'Query', contentList: Array<{ __typename?: 'Content', id: number, displayName: string, contentRewards: Array<{ __typename?: 'ContentReward', averageQuantity: number, isSellable: boolean, contentRewardItem: { __typename?: 'ContentRewardItem', id: number, name: string, price: number, pieColor: string } }>, contentSeeMoreRewards: Array<{ __typename?: 'ContentSeeMoreReward', quantity: number, contentRewardItem: { __typename?: 'ContentRewardItem', id: number, name: string, price: number, pieColor: string } }> }> };

export type ContentRewardListTableQueryVariables = Exact<{
  filter?: InputMaybe<ContentListFilter>;
}>;


export type ContentRewardListTableQuery = { __typename?: 'Query', contentList: Array<{ __typename?: 'Content', displayName: string, id: number, level: number, contentCategory: { __typename?: 'ContentCategory', imageUrl: string, name: string }, contentRewards: Array<{ __typename?: 'ContentReward', averageQuantity: number, isSellable: boolean, contentRewardItem: { __typename?: 'ContentRewardItem', name: string } }>, contentSeeMoreRewards: Array<{ __typename?: 'ContentSeeMoreReward', quantity: number, contentRewardItem: { __typename?: 'ContentRewardItem', name: string } }> }>, contentRewardItems: Array<{ __typename?: 'ContentRewardItem', imageUrl: string, name: string }> };

export type ContentWageListBarChartQueryVariables = Exact<{
  filter?: InputMaybe<ContentWageListFilter>;
  orderBy?: InputMaybe<Array<OrderByArg> | OrderByArg>;
}>;


export type ContentWageListBarChartQuery = { __typename?: 'Query', contentWageList: Array<{ __typename?: 'ContentWage', goldAmountPerHour: number, krwAmountPerHour: number, content: { __typename?: 'Content', displayName: string, contentCategory: { __typename?: 'ContentCategory', name: string } } }> };

export type ContentGroupWageListTableQueryVariables = Exact<{
  filter?: InputMaybe<ContentGroupWageListFilter>;
}>;


export type ContentGroupWageListTableQuery = { __typename?: 'Query', contentGroupWageList: Array<{ __typename?: 'ContentGroupWage', goldAmountPerHour: number, goldAmountPerClear: number, krwAmountPerHour: number, contentGroup: { __typename?: 'ContentGroup', contentIds: Array<number>, durationText: string, level: number, name: string, contentCategory: { __typename?: 'ContentCategory', imageUrl: string, name: string } } }> };

export type ContentWageListTableQueryVariables = Exact<{
  filter?: InputMaybe<ContentWageListFilter>;
}>;


export type ContentWageListTableQuery = { __typename?: 'Query', contentWageList: Array<{ __typename?: 'ContentWage', goldAmountPerHour: number, goldAmountPerClear: number, krwAmountPerHour: number, content: { __typename?: 'Content', displayName: string, durationText: string, id: number, level: number, contentCategory: { __typename?: 'ContentCategory', imageUrl: string, name: string }, contentDuration: { __typename?: 'ContentDuration', id: number } } }> };

export type ContentRewardItemsFilterQueryVariables = Exact<{ [key: string]: never; }>;


export type ContentRewardItemsFilterQuery = { __typename?: 'Query', contentRewardItems: Array<{ __typename?: 'ContentRewardItem', id: number, name: string }> };

export type CustomContentWageCalculateDialogQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CustomContentWageCalculateDialogQueryQuery = { __typename?: 'Query', contentRewardItems: Array<{ __typename?: 'ContentRewardItem', id: number, name: string }> };

export type CustomContentWageCalculateDialogMutationMutationVariables = Exact<{
  input: CustomContentWageCalculateInput;
}>;


export type CustomContentWageCalculateDialogMutationMutation = { __typename?: 'Mutation', customContentWageCalculate: { __typename?: 'CustomContentWageCalculateResult', krwAmountPerHour: number, goldAmountPerHour: number, goldAmountPerClear: number, ok: boolean } };

export type UserGoldExchangeRateSettingDialogQueryVariables = Exact<{ [key: string]: never; }>;


export type UserGoldExchangeRateSettingDialogQuery = { __typename?: 'Query', userGoldExchangeRate: { __typename?: 'UserGoldExchangeRate', id: number, krwAmount: number, goldAmount: number } };

export type UserGoldExchangeRateEditMutationVariables = Exact<{
  input: UserGoldExchangeRateEditInput;
}>;


export type UserGoldExchangeRateEditMutation = { __typename?: 'Mutation', userGoldExchangeRateEdit: { __typename?: 'UserGoldExchangeRateEditResult', ok: boolean } };

export type ContentWageTableTabQueryVariables = Exact<{ [key: string]: never; }>;


export type ContentWageTableTabQuery = { __typename?: 'Query', goldExchangeRate: { __typename?: 'UserGoldExchangeRate', goldAmount: number, krwAmount: number } };

export type AuctionItemListTableQueryVariables = Exact<{
  filter?: InputMaybe<AuctionItemListFilter>;
  take?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrderByArg> | OrderByArg>;
}>;


export type AuctionItemListTableQuery = { __typename?: 'Query', auctionItemList: Array<{ __typename?: 'AuctionItem', avgBuyPrice: number, imageUrl: string, name: string }>, auctionItems: Array<{ __typename?: 'AuctionItem', updatedAt: Date }> };

export type ExtraItemListTableQueryVariables = Exact<{
  filter?: InputMaybe<ContentRewardItemsFilter>;
}>;


export type ExtraItemListTableQuery = { __typename?: 'Query', contentRewardItems: Array<{ __typename?: 'ContentRewardItem', id: number, imageUrl: string, name: string, price: number }> };

export type UserExtraItemPriceEditDialogQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type UserExtraItemPriceEditDialogQuery = { __typename?: 'Query', contentRewardItem: { __typename?: 'ContentRewardItem', name: string, userContentRewardItem: { __typename?: 'UserContentRewardItem', id: number, price: number } } };

export type UserContentRewardItemEditMutationVariables = Exact<{
  input: UserContentRewardItemEditInput;
}>;


export type UserContentRewardItemEditMutation = { __typename?: 'Mutation', userContentRewardItemEdit: { __typename?: 'UserContentRewardItemEditResult', ok: boolean } };

export type MarketItemListTableQueryVariables = Exact<{
  filter?: InputMaybe<MarketItemListFilter>;
  take?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrderByArg> | OrderByArg>;
}>;


export type MarketItemListTableQuery = { __typename?: 'Query', marketItemList: Array<{ __typename?: 'MarketItem', bundleCount: number, currentMinPrice: number, imageUrl: string, name: string, recentPrice: number, yDayAvgPrice: number }>, marketItems: Array<{ __typename?: 'MarketItem', updatedAt: Date }> };

export type ContentCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ContentCategoriesQuery = { __typename?: 'Query', contentCategories: Array<{ __typename?: 'ContentCategory', id: number, name: string }> };

export type ContentDetailsDialogQueryVariables = Exact<{
  contentId: Scalars['Int']['input'];
}>;


export type ContentDetailsDialogQuery = { __typename?: 'Query', content: { __typename?: 'Content', displayName: string, level: number, contentCategory: { __typename?: 'ContentCategory', imageUrl: string, name: string }, contentRewards: Array<{ __typename?: 'ContentReward', averageQuantity: number, isSellable: boolean, contentRewardItem: { __typename?: 'ContentRewardItem', imageUrl: string, name: string } }>, contentSeeMoreRewards: Array<{ __typename?: 'ContentSeeMoreReward', quantity: number, contentRewardItem: { __typename?: 'ContentRewardItem', imageUrl: string, name: string } }> }, contentRewardItems: Array<{ __typename?: 'ContentRewardItem', id: number, name: string }> };

export type ContentDetailsDialogWageSectionQueryVariables = Exact<{
  contentId: Scalars['Int']['input'];
  filter?: InputMaybe<ContentWageFilter>;
}>;


export type ContentDetailsDialogWageSectionQuery = { __typename?: 'Query', content: { __typename?: 'Content', durationText: string, id: number, contentDuration: { __typename?: 'ContentDuration', id: number }, wage: { __typename?: 'ContentWage', krwAmountPerHour: number, goldAmountPerHour: number, goldAmountPerClear: number } } };

export type ContentGroupDetailsDialogQueryVariables = Exact<{
  contentIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type ContentGroupDetailsDialogQuery = { __typename?: 'Query', contentGroup: { __typename?: 'ContentGroup', name: string, contents: Array<{ __typename?: 'Content', gate?: number | null, id: number }> } };

export type ContentRewardReportDialogQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ContentRewardReportDialogQuery = { __typename?: 'Query', content: { __typename?: 'Content', contentRewards: Array<{ __typename?: 'ContentReward', id: number, isSellable: boolean, contentRewardItem: { __typename?: 'ContentRewardItem', name: string }, userContentReward: { __typename?: 'UserContentReward', averageQuantity: number } }> } };

export type ContentRewardsReportMutationVariables = Exact<{
  input: ContentRewardsReportInput;
}>;


export type ContentRewardsReportMutation = { __typename?: 'Mutation', contentRewardsReport: { __typename?: 'ContentRewardsReportResult', ok: boolean } };

export type UserContentDurationEditDialogQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type UserContentDurationEditDialogQuery = { __typename?: 'Query', contentDuration: { __typename?: 'ContentDuration', content: { __typename?: 'Content', displayName: string }, userContentDuration: { __typename?: 'UserContentDuration', id: number, value: number } } };

export type UserContentDurationEditMutationVariables = Exact<{
  input: UserContentDurationEditInput;
}>;


export type UserContentDurationEditMutation = { __typename?: 'Mutation', userContentDurationEdit: { __typename?: 'UserContentDurationEditResult', ok: boolean } };

export type UserContentGroupDurationEditDialogQueryVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type UserContentGroupDurationEditDialogQuery = { __typename?: 'Query', contentGroup: { __typename?: 'ContentGroup', name: string }, contents: Array<{ __typename?: 'Content', gate?: number | null, contentDuration: { __typename?: 'ContentDuration', userContentDuration: { __typename?: 'UserContentDuration', id: number, value: number } } }> };

export type UserContentDurationsEditMutationVariables = Exact<{
  input: UserContentDurationsEditInput;
}>;


export type UserContentDurationsEditMutation = { __typename?: 'Mutation', userContentDurationsEdit: { __typename?: 'UserContentDurationsEditResult', ok: boolean } };

export type UserContentRewardEditDialogQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type UserContentRewardEditDialogQuery = { __typename?: 'Query', content: { __typename?: 'Content', displayName: string, contentRewards: Array<{ __typename?: 'ContentReward', isSellable: boolean, contentRewardItem: { __typename?: 'ContentRewardItem', name: string }, userContentReward: { __typename?: 'UserContentReward', averageQuantity: number, id: number } }> } };

export type UserContentRewardsEditMutationVariables = Exact<{
  input: UserContentRewardsEditInput;
}>;


export type UserContentRewardsEditMutation = { __typename?: 'Mutation', userContentRewardsEdit: { __typename?: 'UserContentRewardsEditResult', ok: boolean } };

export type UserContentSeeMoreRewardEditDialogQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type UserContentSeeMoreRewardEditDialogQuery = { __typename?: 'Query', content: { __typename?: 'Content', displayName: string, contentSeeMoreRewards: Array<{ __typename?: 'ContentSeeMoreReward', contentRewardItem: { __typename?: 'ContentRewardItem', name: string }, userContentSeeMoreReward: { __typename?: 'UserContentSeeMoreReward', quantity: number, id: number } }> } };

export type UserContentSeeMoreRewardsEditMutationVariables = Exact<{
  input: UserContentSeeMoreRewardsEditInput;
}>;


export type UserContentSeeMoreRewardsEditMutation = { __typename?: 'Mutation', userContentSeeMoreRewardsEdit: { __typename?: 'UserContentSeeMoreRewardsEditResult', ok: boolean } };

export type ItemStatUpdateToggleTipQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrderByArg> | OrderByArg>;
}>;


export type ItemStatUpdateToggleTipQuery = { __typename?: 'Query', marketItems: Array<{ __typename?: 'MarketItem', updatedAt: Date }>, auctionItems: Array<{ __typename?: 'AuctionItem', updatedAt: Date }> };


export const ContentCreateTabDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentCreateTabData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentRewardItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ContentCreateTabDataQuery, ContentCreateTabDataQueryVariables>;
export const ContentCreateTabDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ContentCreateTab"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<ContentCreateTabMutation, ContentCreateTabMutationVariables>;
export const PredictRewardsTabDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PredictRewardsTab"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<PredictRewardsTabQuery, PredictRewardsTabQueryVariables>;
export const UserListTabQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserListTabQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}},{"kind":"Field","name":{"kind":"Name","value":"refId"}}]}}]}}]} as unknown as DocumentNode<UserListTabQueryQuery, UserListTabQueryQueryVariables>;
export const ValidateRewardsTabDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ValidateRewardsTab"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"contentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ValidateRewardsTabQuery, ValidateRewardsTabQueryVariables>;
export const ContentRewardListPieChartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentRewardListPieChart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentListFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"contentRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"contentRewardItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"pieColor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isSellable"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentSeeMoreRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"contentRewardItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"pieColor"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ContentRewardListPieChartQuery, ContentRewardListPieChartQueryVariables>;
export const ContentRewardListTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentRewardListTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentListFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"contentRewardItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isSellable"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentSeeMoreRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"contentRewardItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentRewardItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ContentRewardListTableQuery, ContentRewardListTableQueryVariables>;
export const ContentWageListBarChartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentWageListBarChart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentWageListFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderByArg"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentWageList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerHour"}},{"kind":"Field","name":{"kind":"Name","value":"krwAmountPerHour"}}]}}]}}]} as unknown as DocumentNode<ContentWageListBarChartQuery, ContentWageListBarChartQueryVariables>;
export const ContentGroupWageListTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentGroupWageListTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentGroupWageListFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentGroupWageList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentIds"}},{"kind":"Field","name":{"kind":"Name","value":"durationText"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerHour"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerClear"}},{"kind":"Field","name":{"kind":"Name","value":"krwAmountPerHour"}}]}}]}}]} as unknown as DocumentNode<ContentGroupWageListTableQuery, ContentGroupWageListTableQueryVariables>;
export const ContentWageListTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentWageListTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentWageListFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentWageList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentDuration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"durationText"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}}]}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerHour"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerClear"}},{"kind":"Field","name":{"kind":"Name","value":"krwAmountPerHour"}}]}}]}}]} as unknown as DocumentNode<ContentWageListTableQuery, ContentWageListTableQueryVariables>;
export const ContentRewardItemsFilterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentRewardItemsFilter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentRewardItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ContentRewardItemsFilterQuery, ContentRewardItemsFilterQueryVariables>;
export const CustomContentWageCalculateDialogQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CustomContentWageCalculateDialogQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentRewardItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CustomContentWageCalculateDialogQueryQuery, CustomContentWageCalculateDialogQueryQueryVariables>;
export const CustomContentWageCalculateDialogMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CustomContentWageCalculateDialogMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CustomContentWageCalculateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customContentWageCalculate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"krwAmountPerHour"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerHour"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerClear"}},{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<CustomContentWageCalculateDialogMutationMutation, CustomContentWageCalculateDialogMutationMutationVariables>;
export const UserGoldExchangeRateSettingDialogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserGoldExchangeRateSettingDialog"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userGoldExchangeRate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"krwAmount"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmount"}}]}}]}}]} as unknown as DocumentNode<UserGoldExchangeRateSettingDialogQuery, UserGoldExchangeRateSettingDialogQueryVariables>;
export const UserGoldExchangeRateEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserGoldExchangeRateEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserGoldExchangeRateEditInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userGoldExchangeRateEdit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<UserGoldExchangeRateEditMutation, UserGoldExchangeRateEditMutationVariables>;
export const ContentWageTableTabDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentWageTableTab"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goldExchangeRate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goldAmount"}},{"kind":"Field","name":{"kind":"Name","value":"krwAmount"}}]}}]}}]} as unknown as DocumentNode<ContentWageTableTabQuery, ContentWageTableTabQueryVariables>;
export const AuctionItemListTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AuctionItemListTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AuctionItemListFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderByArg"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auctionItemList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgBuyPrice"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"auctionItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AuctionItemListTableQuery, AuctionItemListTableQueryVariables>;
export const ExtraItemListTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExtraItemListTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentRewardItemsFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentRewardItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<ExtraItemListTableQuery, ExtraItemListTableQueryVariables>;
export const UserExtraItemPriceEditDialogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserExtraItemPriceEditDialog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentRewardItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userContentRewardItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]}}]} as unknown as DocumentNode<UserExtraItemPriceEditDialogQuery, UserExtraItemPriceEditDialogQueryVariables>;
export const UserContentRewardItemEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserContentRewardItemEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserContentRewardItemEditInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userContentRewardItemEdit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<UserContentRewardItemEditMutation, UserContentRewardItemEditMutationVariables>;
export const MarketItemListTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MarketItemListTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MarketItemListFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderByArg"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"marketItemList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bundleCount"}},{"kind":"Field","name":{"kind":"Name","value":"currentMinPrice"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"recentPrice"}},{"kind":"Field","name":{"kind":"Name","value":"yDayAvgPrice"}}]}},{"kind":"Field","name":{"kind":"Name","value":"marketItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<MarketItemListTableQuery, MarketItemListTableQueryVariables>;
export const ContentCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ContentCategoriesQuery, ContentCategoriesQueryVariables>;
export const ContentDetailsDialogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentDetailsDialog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"contentRewardItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isSellable"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentSeeMoreRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentRewardItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"level"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentRewardItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ContentDetailsDialogQuery, ContentDetailsDialogQueryVariables>;
export const ContentDetailsDialogWageSectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentDetailsDialogWageSection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentWageFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentDuration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"durationText"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"krwAmountPerHour"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerHour"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerClear"}}]}}]}}]}}]} as unknown as DocumentNode<ContentDetailsDialogWageSectionQuery, ContentDetailsDialogWageSectionQueryVariables>;
export const ContentGroupDetailsDialogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentGroupDetailsDialog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contentIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contentIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contentIds"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ContentGroupDetailsDialogQuery, ContentGroupDetailsDialogQueryVariables>;
export const ContentRewardReportDialogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentRewardReportDialog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentRewardItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isSellable"}},{"kind":"Field","name":{"kind":"Name","value":"userContentReward"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageQuantity"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ContentRewardReportDialogQuery, ContentRewardReportDialogQueryVariables>;
export const ContentRewardsReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ContentRewardsReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentRewardsReportInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentRewardsReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<ContentRewardsReportMutation, ContentRewardsReportMutationVariables>;
export const UserContentDurationEditDialogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserContentDurationEditDialog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentDuration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userContentDuration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<UserContentDurationEditDialogQuery, UserContentDurationEditDialogQueryVariables>;
export const UserContentDurationEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserContentDurationEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserContentDurationEditInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userContentDurationEdit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<UserContentDurationEditMutation, UserContentDurationEditMutationVariables>;
export const UserContentGroupDurationEditDialogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserContentGroupDurationEditDialog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contentIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentDuration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userContentDuration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"gate"}}]}}]}}]} as unknown as DocumentNode<UserContentGroupDurationEditDialogQuery, UserContentGroupDurationEditDialogQueryVariables>;
export const UserContentDurationsEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserContentDurationsEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserContentDurationsEditInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userContentDurationsEdit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<UserContentDurationsEditMutation, UserContentDurationsEditMutationVariables>;
export const UserContentRewardEditDialogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserContentRewardEditDialog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentRewardItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isSellable"}},{"kind":"Field","name":{"kind":"Name","value":"userContentReward"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}}]}}]} as unknown as DocumentNode<UserContentRewardEditDialogQuery, UserContentRewardEditDialogQueryVariables>;
export const UserContentRewardsEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserContentRewardsEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserContentRewardsEditInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userContentRewardsEdit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<UserContentRewardsEditMutation, UserContentRewardsEditMutationVariables>;
export const UserContentSeeMoreRewardEditDialogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserContentSeeMoreRewardEditDialog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentSeeMoreRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentRewardItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userContentSeeMoreReward"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}}]}}]} as unknown as DocumentNode<UserContentSeeMoreRewardEditDialogQuery, UserContentSeeMoreRewardEditDialogQueryVariables>;
export const UserContentSeeMoreRewardsEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserContentSeeMoreRewardsEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserContentSeeMoreRewardsEditInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userContentSeeMoreRewardsEdit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<UserContentSeeMoreRewardsEditMutation, UserContentSeeMoreRewardsEditMutationVariables>;
export const ItemStatUpdateToggleTipDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ItemStatUpdateToggleTip"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderByArg"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"marketItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"auctionItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ItemStatUpdateToggleTipQuery, ItemStatUpdateToggleTipQueryVariables>;