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
  contentRewards: Array<ContentCreateItemsInput>;
  contentSeeMoreRewards?: InputMaybe<Array<ContentCreateSeeMoreRewardsInput>>;
  duration: Scalars['Int']['input'];
  gate?: InputMaybe<Scalars['Int']['input']>;
  level: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type ContentCreateItemsInput = {
  averageQuantity: Scalars['Float']['input'];
  isSellable: Scalars['Boolean']['input'];
  itemId: Scalars['Int']['input'];
};

export type ContentCreateResult = {
  __typename?: 'ContentCreateResult';
  ok: Scalars['Boolean']['output'];
};

export type ContentCreateSeeMoreRewardsInput = {
  itemId: Scalars['Int']['input'];
  quantity: Scalars['Float']['input'];
};

export type ContentDuration = {
  __typename?: 'ContentDuration';
  content: Content;
  contentId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['Int']['output'];
};

export type ContentDurationEditInput = {
  contentId: Scalars['Int']['input'];
  minutes: Scalars['Int']['input'];
  seconds: Scalars['Int']['input'];
};

export type ContentDurationEditResult = {
  __typename?: 'ContentDurationEditResult';
  ok: Scalars['Boolean']['output'];
};

export type ContentDurationsEditInput = {
  contentDurations: Array<ContentDurationsEditInputDuration>;
};

export type ContentDurationsEditInputDuration = {
  contentId: Scalars['Int']['input'];
  minutes: Scalars['Int']['input'];
  seconds: Scalars['Int']['input'];
};

export type ContentDurationsEditResult = {
  __typename?: 'ContentDurationsEditResult';
  ok: Scalars['Boolean']['output'];
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
  includeIsBound?: InputMaybe<Scalars['Boolean']['input']>;
  includeIsSeeMore?: InputMaybe<Scalars['Boolean']['input']>;
  includeItemIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ContentStatus>;
};

export type ContentListFilter = {
  contentCategoryId?: InputMaybe<Scalars['Int']['input']>;
  includeIsSeeMore?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ContentStatus>;
};

export type ContentObjectWageFilter = {
  __typename?: 'ContentObjectWageFilter';
  includeIsBound?: Maybe<Scalars['Boolean']['output']>;
  includeIsSeeMore?: Maybe<Scalars['Boolean']['output']>;
  includeItemIds?: Maybe<Array<Scalars['String']['output']>>;
};

export type ContentReward = {
  __typename?: 'ContentReward';
  averageQuantity: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isSellable: Scalars['Boolean']['output'];
  item: Item;
  itemId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ContentRewardEditInput = {
  averageQuantity: Scalars['Float']['input'];
  contentId: Scalars['Int']['input'];
  isSellable: Scalars['Boolean']['input'];
  itemId: Scalars['Int']['input'];
};

export type ContentRewardReportInput = {
  averageQuantity: Scalars['Float']['input'];
  id: Scalars['Int']['input'];
};

export type ContentRewardsEditInput = {
  contentRewards: Array<ContentRewardEditInput>;
  isReportable: Scalars['Boolean']['input'];
};

export type ContentRewardsEditResult = {
  __typename?: 'ContentRewardsEditResult';
  ok: Scalars['Boolean']['output'];
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
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  item: Item;
  itemId: Scalars['Int']['output'];
  quantity: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ContentSeeMoreRewardEditInput = {
  contentId: Scalars['Int']['input'];
  itemId: Scalars['Int']['input'];
  quantity: Scalars['Float']['input'];
};

export type ContentSeeMoreRewardsEditInput = {
  contentSeeMoreRewards: Array<ContentSeeMoreRewardEditInput>;
};

export type ContentSeeMoreRewardsEditResult = {
  __typename?: 'ContentSeeMoreRewardsEditResult';
  ok: Scalars['Boolean']['output'];
};

export enum ContentStatus {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED'
}

export type ContentWage = {
  __typename?: 'ContentWage';
  content: Content;
  contentId: Scalars['Int']['output'];
  goldAmountPerClear: Scalars['Float']['output'];
  goldAmountPerHour: Scalars['Float']['output'];
  krwAmountPerHour: Scalars['Float']['output'];
};

export type ContentWageFilter = {
  includeIsBound?: InputMaybe<Scalars['Boolean']['input']>;
  includeIsSeeMore?: InputMaybe<Scalars['Boolean']['input']>;
  includeItemIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type ContentWageListFilter = {
  contentCategoryId?: InputMaybe<Scalars['Int']['input']>;
  includeIsBound?: InputMaybe<Scalars['Boolean']['input']>;
  includeIsSeeMore?: InputMaybe<Scalars['Boolean']['input']>;
  includeItemIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ContentStatus>;
};

export type ContentsFilter = {
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type CustomContentWageCalculateInput = {
  items: Array<CustomContentWageCalculateItemsInput>;
  minutes: Scalars['Int']['input'];
  seconds: Scalars['Int']['input'];
};

export type CustomContentWageCalculateItemsInput = {
  id: Scalars['Int']['input'];
  quantity: Scalars['Float']['input'];
};

export type CustomContentWageCalculateResult = {
  __typename?: 'CustomContentWageCalculateResult';
  goldAmountPerClear: Scalars['Int']['output'];
  goldAmountPerHour: Scalars['Int']['output'];
  krwAmountPerHour: Scalars['Int']['output'];
  ok: Scalars['Boolean']['output'];
};

export type GoldExchangeRate = {
  __typename?: 'GoldExchangeRate';
  createdAt: Scalars['DateTime']['output'];
  goldAmount: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  krwAmount: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type GoldExchangeRateEditInput = {
  krwAmount: Scalars['Int']['input'];
};

export type GoldExchangeRateEditResult = {
  __typename?: 'GoldExchangeRateEditResult';
  ok: Scalars['Boolean']['output'];
};

export type Item = {
  __typename?: 'Item';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  imageUrl: Scalars['String']['output'];
  kind: ItemKind;
  name: Scalars['String']['output'];
  pieColor: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userItem: UserItem;
};

export enum ItemKind {
  AUCTION = 'AUCTION',
  EXTRA = 'EXTRA',
  MARKET = 'MARKET'
}

export type ItemsFilter = {
  excludeItemName?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<ItemKind>;
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
  contentDurationEdit: ContentDurationEditResult;
  contentDurationsEdit: ContentDurationsEditResult;
  contentRewardsEdit: ContentRewardsEditResult;
  contentRewardsReport: ContentRewardsReportResult;
  contentSeeMoreRewardsEdit: ContentSeeMoreRewardsEditResult;
  customContentWageCalculate: CustomContentWageCalculateResult;
  goldExchangeRateEdit: GoldExchangeRateEditResult;
  userItemEdit: UserItemEditResult;
};


export type MutationContentCreateArgs = {
  input: ContentCreateInput;
};


export type MutationContentDurationEditArgs = {
  input: ContentDurationEditInput;
};


export type MutationContentDurationsEditArgs = {
  input: ContentDurationsEditInput;
};


export type MutationContentRewardsEditArgs = {
  input: ContentRewardsEditInput;
};


export type MutationContentRewardsReportArgs = {
  input: ContentRewardsReportInput;
};


export type MutationContentSeeMoreRewardsEditArgs = {
  input: ContentSeeMoreRewardsEditInput;
};


export type MutationCustomContentWageCalculateArgs = {
  input: CustomContentWageCalculateInput;
};


export type MutationGoldExchangeRateEditArgs = {
  input: GoldExchangeRateEditInput;
};


export type MutationUserItemEditArgs = {
  input: UserItemEditInput;
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
  contentWageList: Array<ContentWage>;
  contents: Array<Content>;
  goldExchangeRate: GoldExchangeRate;
  item: Item;
  items: Array<Item>;
  marketItemList: Array<MarketItem>;
  marketItems: Array<MarketItem>;
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


export type QueryContentWageListArgs = {
  filter?: InputMaybe<ContentWageListFilter>;
  orderBy?: InputMaybe<Array<OrderByArg>>;
};


export type QueryContentsArgs = {
  filter?: InputMaybe<ContentsFilter>;
};


export type QueryItemArgs = {
  id: Scalars['Int']['input'];
};


export type QueryItemsArgs = {
  filter?: InputMaybe<ItemsFilter>;
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

export type UserItem = {
  __typename?: 'UserItem';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  itemId: Scalars['Int']['output'];
  price: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
};

export type UserItemEditInput = {
  id: Scalars['Int']['input'];
  price: Scalars['Float']['input'];
};

export type UserItemEditResult = {
  __typename?: 'UserItemEditResult';
  ok: Scalars['Boolean']['output'];
};

export enum UserRole {
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
  USER = 'USER'
}

export type ContentCreateTabDataQueryVariables = Exact<{ [key: string]: never; }>;


export type ContentCreateTabDataQuery = { __typename?: 'Query', contentCategories: Array<{ __typename?: 'ContentCategory', id: number, name: string }>, items: Array<{ __typename?: 'Item', id: number, name: string }> };

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


export type ContentRewardListPieChartQuery = { __typename?: 'Query', contentList: Array<{ __typename?: 'Content', id: number, displayName: string, contentRewards: Array<{ __typename?: 'ContentReward', averageQuantity: number, isSellable: boolean, item: { __typename?: 'Item', id: number, name: string, price: number, pieColor: string } }>, contentSeeMoreRewards: Array<{ __typename?: 'ContentSeeMoreReward', quantity: number, item: { __typename?: 'Item', id: number, name: string, price: number, pieColor: string } }> }> };

export type ContentRewardListTableQueryVariables = Exact<{
  filter?: InputMaybe<ContentListFilter>;
}>;


export type ContentRewardListTableQuery = { __typename?: 'Query', contentList: Array<{ __typename?: 'Content', displayName: string, id: number, level: number, contentCategory: { __typename?: 'ContentCategory', imageUrl: string, name: string }, contentRewards: Array<{ __typename?: 'ContentReward', averageQuantity: number, isSellable: boolean, item: { __typename?: 'Item', name: string } }>, contentSeeMoreRewards: Array<{ __typename?: 'ContentSeeMoreReward', quantity: number, item: { __typename?: 'Item', name: string } }> }>, items: Array<{ __typename?: 'Item', imageUrl: string, name: string }> };

export type ContentWageListBarChartQueryVariables = Exact<{
  filter?: InputMaybe<ContentWageListFilter>;
  orderBy?: InputMaybe<Array<OrderByArg> | OrderByArg>;
}>;


export type ContentWageListBarChartQuery = { __typename?: 'Query', contentWageList: Array<{ __typename?: 'ContentWage', goldAmountPerHour: number, krwAmountPerHour: number, content: { __typename?: 'Content', displayName: string, contentCategory: { __typename?: 'ContentCategory', name: string } } }> };

export type ContentGroupWageListBarChartQueryVariables = Exact<{
  filter?: InputMaybe<ContentGroupWageListFilter>;
  orderBy?: InputMaybe<Array<OrderByArg> | OrderByArg>;
}>;


export type ContentGroupWageListBarChartQuery = { __typename?: 'Query', contentGroupWageList: Array<{ __typename?: 'ContentGroupWage', goldAmountPerHour: number, krwAmountPerHour: number, contentGroup: { __typename?: 'ContentGroup', name: string, contentCategory: { __typename?: 'ContentCategory', name: string } } }> };

export type ContentGroupWageListTableQueryVariables = Exact<{
  filter?: InputMaybe<ContentGroupWageListFilter>;
}>;


export type ContentGroupWageListTableQuery = { __typename?: 'Query', contentGroupWageList: Array<{ __typename?: 'ContentGroupWage', goldAmountPerHour: number, goldAmountPerClear: number, krwAmountPerHour: number, contentGroup: { __typename?: 'ContentGroup', contentIds: Array<number>, durationText: string, level: number, name: string, contentCategory: { __typename?: 'ContentCategory', imageUrl: string, name: string } } }> };

export type ContentWageListTableQueryVariables = Exact<{
  filter?: InputMaybe<ContentWageListFilter>;
}>;


export type ContentWageListTableQuery = { __typename?: 'Query', contentWageList: Array<{ __typename?: 'ContentWage', goldAmountPerHour: number, goldAmountPerClear: number, krwAmountPerHour: number, content: { __typename?: 'Content', displayName: string, durationText: string, id: number, level: number, contentCategory: { __typename?: 'ContentCategory', imageUrl: string, name: string } } }> };

export type ItemsFilterQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemsFilterQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: number, name: string }> };

export type CustomContentWageCalculateDialogQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CustomContentWageCalculateDialogQueryQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: number, name: string }> };

export type CustomContentWageCalculateDialogMutationMutationVariables = Exact<{
  input: CustomContentWageCalculateInput;
}>;


export type CustomContentWageCalculateDialogMutationMutation = { __typename?: 'Mutation', customContentWageCalculate: { __typename?: 'CustomContentWageCalculateResult', krwAmountPerHour: number, goldAmountPerHour: number, goldAmountPerClear: number, ok: boolean } };

export type GoldExchangeRateSettingDialogQueryVariables = Exact<{ [key: string]: never; }>;


export type GoldExchangeRateSettingDialogQuery = { __typename?: 'Query', goldExchangeRate: { __typename?: 'GoldExchangeRate', id: number, krwAmount: number, goldAmount: number } };

export type GoldExchangeRateEditMutationVariables = Exact<{
  input: GoldExchangeRateEditInput;
}>;


export type GoldExchangeRateEditMutation = { __typename?: 'Mutation', goldExchangeRateEdit: { __typename?: 'GoldExchangeRateEditResult', ok: boolean } };

export type ContentWageTableTabQueryVariables = Exact<{ [key: string]: never; }>;


export type ContentWageTableTabQuery = { __typename?: 'Query', goldExchangeRate: { __typename?: 'GoldExchangeRate', goldAmount: number, krwAmount: number } };

export type AuctionItemListTableQueryVariables = Exact<{
  filter?: InputMaybe<AuctionItemListFilter>;
  take?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrderByArg> | OrderByArg>;
}>;


export type AuctionItemListTableQuery = { __typename?: 'Query', auctionItemList: Array<{ __typename?: 'AuctionItem', avgBuyPrice: number, imageUrl: string, name: string }>, auctionItems: Array<{ __typename?: 'AuctionItem', updatedAt: Date }> };

export type ExtraItemListTableQueryVariables = Exact<{
  filter?: InputMaybe<ItemsFilter>;
}>;


export type ExtraItemListTableQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: number, imageUrl: string, name: string, price: number }> };

export type UserExtraItemPriceEditDialogQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type UserExtraItemPriceEditDialogQuery = { __typename?: 'Query', item: { __typename?: 'Item', name: string, userItem: { __typename?: 'UserItem', id: number, price: number } } };

export type UserItemEditMutationVariables = Exact<{
  input: UserItemEditInput;
}>;


export type UserItemEditMutation = { __typename?: 'Mutation', userItemEdit: { __typename?: 'UserItemEditResult', ok: boolean } };

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


export type ContentDetailsDialogQuery = { __typename?: 'Query', content: { __typename?: 'Content', displayName: string, level: number, contentCategory: { __typename?: 'ContentCategory', imageUrl: string, name: string }, contentRewards: Array<{ __typename?: 'ContentReward', averageQuantity: number, isSellable: boolean, item: { __typename?: 'Item', imageUrl: string, name: string } }>, contentSeeMoreRewards: Array<{ __typename?: 'ContentSeeMoreReward', quantity: number, item: { __typename?: 'Item', imageUrl: string, name: string } }> }, items: Array<{ __typename?: 'Item', id: number, name: string }> };

export type ContentDetailsDialogWageSectionQueryVariables = Exact<{
  contentId: Scalars['Int']['input'];
  filter?: InputMaybe<ContentWageFilter>;
}>;


export type ContentDetailsDialogWageSectionQuery = { __typename?: 'Query', content: { __typename?: 'Content', durationText: string, id: number, wage: { __typename?: 'ContentWage', krwAmountPerHour: number, goldAmountPerHour: number, goldAmountPerClear: number } } };

export type ContentDurationEditDialogQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ContentDurationEditDialogQuery = { __typename?: 'Query', content: { __typename?: 'Content', displayName: string, duration: number } };

export type ContentDurationEditMutationVariables = Exact<{
  input: ContentDurationEditInput;
}>;


export type ContentDurationEditMutation = { __typename?: 'Mutation', contentDurationEdit: { __typename?: 'ContentDurationEditResult', ok: boolean } };

export type ContentGroupDetailsDialogQueryVariables = Exact<{
  contentIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type ContentGroupDetailsDialogQuery = { __typename?: 'Query', contentGroup: { __typename?: 'ContentGroup', name: string, contents: Array<{ __typename?: 'Content', gate?: number | null, id: number }> } };

export type ContentGroupDurationEditDialogQueryVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type ContentGroupDurationEditDialogQuery = { __typename?: 'Query', contentGroup: { __typename?: 'ContentGroup', name: string }, contents: Array<{ __typename?: 'Content', duration: number, gate?: number | null, id: number }> };

export type ContentDurationsEditMutationVariables = Exact<{
  input: ContentDurationsEditInput;
}>;


export type ContentDurationsEditMutation = { __typename?: 'Mutation', contentDurationsEdit: { __typename?: 'ContentDurationsEditResult', ok: boolean } };

export type ContentRewardEditDialogQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ContentRewardEditDialogQuery = { __typename?: 'Query', content: { __typename?: 'Content', displayName: string, contentRewards: Array<{ __typename?: 'ContentReward', averageQuantity: number, id: number, isSellable: boolean, item: { __typename?: 'Item', id: number, name: string } }> } };

export type ContentRewardsEditMutationVariables = Exact<{
  input: ContentRewardsEditInput;
}>;


export type ContentRewardsEditMutation = { __typename?: 'Mutation', contentRewardsEdit: { __typename?: 'ContentRewardsEditResult', ok: boolean } };

export type ContentRewardReportDialogQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ContentRewardReportDialogQuery = { __typename?: 'Query', content: { __typename?: 'Content', contentRewards: Array<{ __typename?: 'ContentReward', averageQuantity: number, id: number, isSellable: boolean, item: { __typename?: 'Item', name: string } }> } };

export type ContentRewardsReportMutationVariables = Exact<{
  input: ContentRewardsReportInput;
}>;


export type ContentRewardsReportMutation = { __typename?: 'Mutation', contentRewardsReport: { __typename?: 'ContentRewardsReportResult', ok: boolean } };

export type ContentSeeMoreRewardEditDialogQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ContentSeeMoreRewardEditDialogQuery = { __typename?: 'Query', content: { __typename?: 'Content', displayName: string, contentSeeMoreRewards: Array<{ __typename?: 'ContentSeeMoreReward', id: number, quantity: number, item: { __typename?: 'Item', id: number, name: string } }> } };

export type ContentSeeMoreRewardsEditMutationVariables = Exact<{
  input: ContentSeeMoreRewardsEditInput;
}>;


export type ContentSeeMoreRewardsEditMutation = { __typename?: 'Mutation', contentSeeMoreRewardsEdit: { __typename?: 'ContentSeeMoreRewardsEditResult', ok: boolean } };

export type ItemStatUpdateToggleTipQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrderByArg> | OrderByArg>;
}>;


export type ItemStatUpdateToggleTipQuery = { __typename?: 'Query', marketItems: Array<{ __typename?: 'MarketItem', updatedAt: Date }>, auctionItems: Array<{ __typename?: 'AuctionItem', updatedAt: Date }> };


export const ContentCreateTabDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentCreateTabData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ContentCreateTabDataQuery, ContentCreateTabDataQueryVariables>;
export const ContentCreateTabDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ContentCreateTab"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<ContentCreateTabMutation, ContentCreateTabMutationVariables>;
export const PredictRewardsTabDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PredictRewardsTab"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<PredictRewardsTabQuery, PredictRewardsTabQueryVariables>;
export const UserListTabQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserListTabQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}},{"kind":"Field","name":{"kind":"Name","value":"refId"}}]}}]}}]} as unknown as DocumentNode<UserListTabQueryQuery, UserListTabQueryQueryVariables>;
export const ValidateRewardsTabDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ValidateRewardsTab"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"contentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ValidateRewardsTabQuery, ValidateRewardsTabQueryVariables>;
export const ContentRewardListPieChartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentRewardListPieChart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentListFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"contentRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"pieColor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isSellable"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentSeeMoreRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"pieColor"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ContentRewardListPieChartQuery, ContentRewardListPieChartQueryVariables>;
export const ContentRewardListTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentRewardListTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentListFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isSellable"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentSeeMoreRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ContentRewardListTableQuery, ContentRewardListTableQueryVariables>;
export const ContentWageListBarChartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentWageListBarChart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentWageListFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderByArg"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentWageList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerHour"}},{"kind":"Field","name":{"kind":"Name","value":"krwAmountPerHour"}}]}}]}}]} as unknown as DocumentNode<ContentWageListBarChartQuery, ContentWageListBarChartQueryVariables>;
export const ContentGroupWageListBarChartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentGroupWageListBarChart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentGroupWageListFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderByArg"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentGroupWageList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerHour"}},{"kind":"Field","name":{"kind":"Name","value":"krwAmountPerHour"}}]}}]}}]} as unknown as DocumentNode<ContentGroupWageListBarChartQuery, ContentGroupWageListBarChartQueryVariables>;
export const ContentGroupWageListTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentGroupWageListTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentGroupWageListFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentGroupWageList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentIds"}},{"kind":"Field","name":{"kind":"Name","value":"durationText"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerHour"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerClear"}},{"kind":"Field","name":{"kind":"Name","value":"krwAmountPerHour"}}]}}]}}]} as unknown as DocumentNode<ContentGroupWageListTableQuery, ContentGroupWageListTableQueryVariables>;
export const ContentWageListTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentWageListTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentWageListFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentWageList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"durationText"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}}]}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerHour"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerClear"}},{"kind":"Field","name":{"kind":"Name","value":"krwAmountPerHour"}}]}}]}}]} as unknown as DocumentNode<ContentWageListTableQuery, ContentWageListTableQueryVariables>;
export const ItemsFilterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ItemsFilter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ItemsFilterQuery, ItemsFilterQueryVariables>;
export const CustomContentWageCalculateDialogQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CustomContentWageCalculateDialogQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CustomContentWageCalculateDialogQueryQuery, CustomContentWageCalculateDialogQueryQueryVariables>;
export const CustomContentWageCalculateDialogMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CustomContentWageCalculateDialogMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CustomContentWageCalculateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customContentWageCalculate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"krwAmountPerHour"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerHour"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerClear"}},{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<CustomContentWageCalculateDialogMutationMutation, CustomContentWageCalculateDialogMutationMutationVariables>;
export const GoldExchangeRateSettingDialogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GoldExchangeRateSettingDialog"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goldExchangeRate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"krwAmount"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmount"}}]}}]}}]} as unknown as DocumentNode<GoldExchangeRateSettingDialogQuery, GoldExchangeRateSettingDialogQueryVariables>;
export const GoldExchangeRateEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GoldExchangeRateEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GoldExchangeRateEditInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goldExchangeRateEdit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<GoldExchangeRateEditMutation, GoldExchangeRateEditMutationVariables>;
export const ContentWageTableTabDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentWageTableTab"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goldExchangeRate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goldAmount"}},{"kind":"Field","name":{"kind":"Name","value":"krwAmount"}}]}}]}}]} as unknown as DocumentNode<ContentWageTableTabQuery, ContentWageTableTabQueryVariables>;
export const AuctionItemListTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AuctionItemListTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AuctionItemListFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderByArg"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auctionItemList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgBuyPrice"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"auctionItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AuctionItemListTableQuery, AuctionItemListTableQueryVariables>;
export const ExtraItemListTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExtraItemListTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ItemsFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<ExtraItemListTableQuery, ExtraItemListTableQueryVariables>;
export const UserExtraItemPriceEditDialogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserExtraItemPriceEditDialog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"item"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]}}]} as unknown as DocumentNode<UserExtraItemPriceEditDialogQuery, UserExtraItemPriceEditDialogQueryVariables>;
export const UserItemEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserItemEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserItemEditInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userItemEdit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<UserItemEditMutation, UserItemEditMutationVariables>;
export const MarketItemListTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MarketItemListTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MarketItemListFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderByArg"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"marketItemList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bundleCount"}},{"kind":"Field","name":{"kind":"Name","value":"currentMinPrice"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"recentPrice"}},{"kind":"Field","name":{"kind":"Name","value":"yDayAvgPrice"}}]}},{"kind":"Field","name":{"kind":"Name","value":"marketItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<MarketItemListTableQuery, MarketItemListTableQueryVariables>;
export const ContentCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ContentCategoriesQuery, ContentCategoriesQueryVariables>;
export const ContentDetailsDialogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentDetailsDialog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isSellable"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentSeeMoreRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"level"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ContentDetailsDialogQuery, ContentDetailsDialogQueryVariables>;
export const ContentDetailsDialogWageSectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentDetailsDialogWageSection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentWageFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"durationText"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"krwAmountPerHour"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerHour"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerClear"}}]}}]}}]}}]} as unknown as DocumentNode<ContentDetailsDialogWageSectionQuery, ContentDetailsDialogWageSectionQueryVariables>;
export const ContentDurationEditDialogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentDurationEditDialog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]}}]} as unknown as DocumentNode<ContentDurationEditDialogQuery, ContentDurationEditDialogQueryVariables>;
export const ContentDurationEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ContentDurationEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentDurationEditInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentDurationEdit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<ContentDurationEditMutation, ContentDurationEditMutationVariables>;
export const ContentGroupDetailsDialogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentGroupDetailsDialog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contentIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contentIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contentIds"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ContentGroupDetailsDialogQuery, ContentGroupDetailsDialogQueryVariables>;
export const ContentGroupDurationEditDialogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentGroupDurationEditDialog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contentIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"gate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ContentGroupDurationEditDialogQuery, ContentGroupDurationEditDialogQueryVariables>;
export const ContentDurationsEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ContentDurationsEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentDurationsEditInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentDurationsEdit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<ContentDurationsEditMutation, ContentDurationsEditMutationVariables>;
export const ContentRewardEditDialogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentRewardEditDialog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isSellable"}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}}]}}]} as unknown as DocumentNode<ContentRewardEditDialogQuery, ContentRewardEditDialogQueryVariables>;
export const ContentRewardsEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ContentRewardsEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentRewardsEditInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentRewardsEdit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<ContentRewardsEditMutation, ContentRewardsEditMutationVariables>;
export const ContentRewardReportDialogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentRewardReportDialog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isSellable"}}]}}]}}]}}]} as unknown as DocumentNode<ContentRewardReportDialogQuery, ContentRewardReportDialogQueryVariables>;
export const ContentRewardsReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ContentRewardsReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentRewardsReportInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentRewardsReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<ContentRewardsReportMutation, ContentRewardsReportMutationVariables>;
export const ContentSeeMoreRewardEditDialogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentSeeMoreRewardEditDialog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentSeeMoreRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}}]}}]} as unknown as DocumentNode<ContentSeeMoreRewardEditDialogQuery, ContentSeeMoreRewardEditDialogQueryVariables>;
export const ContentSeeMoreRewardsEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ContentSeeMoreRewardsEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentSeeMoreRewardsEditInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentSeeMoreRewardsEdit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<ContentSeeMoreRewardsEditMutation, ContentSeeMoreRewardsEditMutationVariables>;
export const ItemStatUpdateToggleTipDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ItemStatUpdateToggleTip"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderByArg"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"marketItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"auctionItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ItemStatUpdateToggleTipQuery, ItemStatUpdateToggleTipQueryVariables>;