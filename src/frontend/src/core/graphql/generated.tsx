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
  Boolean: { input: boolean; output: boolean; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: Date; output: Date; }
  Float: { input: number; output: number; }
  ID: { input: string; output: string; }
  Int: { input: number; output: number; }
  String: { input: string; output: string; }
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
  isBound: Scalars['Boolean']['input'];
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
  userItemPriceEdit: UserItemPriceEditResult;
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


export type MutationUserItemPriceEditArgs = {
  input: UserItemPriceEditInput;
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
  contents: Array<Content>;
  contentWageList: Array<ContentWage>;
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

export type UserItemPriceEditInput = {
  id: Scalars['Int']['input'];
  price: Scalars['Float']['input'];
};

export type UserItemPriceEditResult = {
  __typename?: 'UserItemPriceEditResult';
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


export type UserListTabQueryQuery = { __typename?: 'Query', userList: Array<{ __typename?: 'User', createdAt: Date, displayName: string, email?: string | null, imageUrl?: string | null, provider: AuthProvider, refId: string }> };

export type ValidateRewardsTabQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidateRewardsTabQuery = { __typename?: 'Query', contentList: Array<{ __typename?: 'Content', contentCategory: { __typename?: 'ContentCategory', name: string }; id: number, level: number, }> };

export type ContentRewardListTableQueryVariables = Exact<{
  filter?: InputMaybe<ContentListFilter>;
}>;


export type ContentRewardListTableQuery = { __typename?: 'Query', contentList: Array<{ __typename?: 'Content', contentCategory: { __typename?: 'ContentCategory', imageUrl: string, name: string }, contentRewards: Array<{ __typename?: 'ContentReward', averageQuantity: number, isSellable: boolean, item: { __typename?: 'Item', name: string } }>, contentSeeMoreRewards: Array<{ __typename?: 'ContentSeeMoreReward', item: { __typename?: 'Item', name: string }; quantity: number, }>; displayName: string, id: number, level: number, }>, items: Array<{ __typename?: 'Item', imageUrl: string, name: string }> };

export type ContentGroupWageListTableQueryVariables = Exact<{
  filter?: InputMaybe<ContentGroupWageListFilter>;
}>;


export type ContentGroupWageListTableQuery = { __typename?: 'Query', contentGroupWageList: Array<{ __typename?: 'ContentGroupWage', contentGroup: { __typename?: 'ContentGroup', contentCategory: { __typename?: 'ContentCategory', id: number, imageUrl: string, name: string }; contentIds: Array<number>, durationText: string, level: number, name: string, }; goldAmountPerClear: number, goldAmountPerHour: number, krwAmountPerHour: number, }> };

export type ContentWageListTableQueryVariables = Exact<{
  filter?: InputMaybe<ContentWageListFilter>;
}>;


export type ContentWageListTableQuery = { __typename?: 'Query', contentWageList: Array<{ __typename?: 'ContentWage', content: { __typename?: 'Content', contentCategory: { __typename?: 'ContentCategory', imageUrl: string, name: string }; displayName: string, durationText: string, id: number, level: number, }; goldAmountPerClear: number, goldAmountPerHour: number, krwAmountPerHour: number, }> };

export type ItemsFilterQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemsFilterQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: number, name: string }> };

export type CustomContentWageCalculateDialogQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CustomContentWageCalculateDialogQueryQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: number, name: string }> };

export type CustomContentWageCalculateDialogMutationMutationVariables = Exact<{
  input: CustomContentWageCalculateInput;
}>;


export type CustomContentWageCalculateDialogMutationMutation = { __typename?: 'Mutation', customContentWageCalculate: { __typename?: 'CustomContentWageCalculateResult', goldAmountPerClear: number, goldAmountPerHour: number, krwAmountPerHour: number, ok: boolean } };

export type GoldExchangeRateSettingDialogQueryVariables = Exact<{ [key: string]: never; }>;


export type GoldExchangeRateSettingDialogQuery = { __typename?: 'Query', goldExchangeRate: { __typename?: 'GoldExchangeRate', goldAmount: number; id: number, krwAmount: number, } };

export type GoldExchangeRateEditMutationVariables = Exact<{
  input: GoldExchangeRateEditInput;
}>;


export type GoldExchangeRateEditMutation = { __typename?: 'Mutation', goldExchangeRateEdit: { __typename?: 'GoldExchangeRateEditResult', ok: boolean } };

export type ContentWageListQueryVariables = Exact<{ [key: string]: never; }>;


export type ContentWageListQuery = { __typename?: 'Query', goldExchangeRate: { __typename?: 'GoldExchangeRate', goldAmount: number, krwAmount: number } };

export type AuctionItemListTableQueryVariables = Exact<{
  filter?: InputMaybe<AuctionItemListFilter>;
  orderBy?: InputMaybe<Array<OrderByArg> | OrderByArg>;
  take?: InputMaybe<Scalars['Int']['input']>;
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

export type UserItemPriceEditMutationVariables = Exact<{
  input: UserItemPriceEditInput;
}>;


export type UserItemPriceEditMutation = { __typename?: 'Mutation', userItemPriceEdit: { __typename?: 'UserItemPriceEditResult', ok: boolean } };

export type MarketItemListTableQueryVariables = Exact<{
  filter?: InputMaybe<MarketItemListFilter>;
  orderBy?: InputMaybe<Array<OrderByArg> | OrderByArg>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type MarketItemListTableQuery = { __typename?: 'Query', marketItemList: Array<{ __typename?: 'MarketItem', bundleCount: number, currentMinPrice: number, imageUrl: string, name: string, recentPrice: number, yDayAvgPrice: number }>, marketItems: Array<{ __typename?: 'MarketItem', updatedAt: Date }> };

export type ContentCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ContentCategoriesQuery = { __typename?: 'Query', contentCategories: Array<{ __typename?: 'ContentCategory', id: number, name: string }> };

export type ContentDetailsDialogQueryVariables = Exact<{
  contentId: Scalars['Int']['input'];
}>;


export type ContentDetailsDialogQuery = { __typename?: 'Query', content: { __typename?: 'Content', contentCategory: { __typename?: 'ContentCategory', imageUrl: string, name: string }, contentRewards: Array<{ __typename?: 'ContentReward', averageQuantity: number, isSellable: boolean, item: { __typename?: 'Item', imageUrl: string, name: string } }>, contentSeeMoreRewards: Array<{ __typename?: 'ContentSeeMoreReward', item: { __typename?: 'Item', imageUrl: string, name: string }; quantity: number, }>; displayName: string, level: number, }, items: Array<{ __typename?: 'Item', id: number, name: string }> };

export type ContentDetailsDialogWageSectionQueryVariables = Exact<{
  contentId: Scalars['Int']['input'];
  filter?: InputMaybe<ContentWageFilter>;
}>;


export type ContentDetailsDialogWageSectionQuery = { __typename?: 'Query', content: { __typename?: 'Content', durationText: string, id: number, wage: { __typename?: 'ContentWage', goldAmountPerClear: number; goldAmountPerHour: number, krwAmountPerHour: number, } } };

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


export type ContentGroupDetailsDialogQuery = { __typename?: 'Query', contentGroup: { __typename?: 'ContentGroup', contents: Array<{ __typename?: 'Content', gate?: number | null, id: number }>; name: string, } };

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


export type ContentRewardEditDialogQuery = { __typename?: 'Query', content: { __typename?: 'Content', contentRewards: Array<{ __typename?: 'ContentReward', averageQuantity: number, id: number, isSellable: boolean, item: { __typename?: 'Item', id: number, name: string } }>; displayName: string, } };

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


export type ContentSeeMoreRewardEditDialogQuery = { __typename?: 'Query', content: { __typename?: 'Content', contentSeeMoreRewards: Array<{ __typename?: 'ContentSeeMoreReward', id: number, item: { __typename?: 'Item', id: number, name: string }; quantity: number, }>; displayName: string, } };

export type ContentSeeMoreRewardsEditMutationVariables = Exact<{
  input: ContentSeeMoreRewardsEditInput;
}>;


export type ContentSeeMoreRewardsEditMutation = { __typename?: 'Mutation', contentSeeMoreRewardsEdit: { __typename?: 'ContentSeeMoreRewardsEditResult', ok: boolean } };

export type ItemStatUpdateToggleTipQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<OrderByArg> | OrderByArg>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ItemStatUpdateToggleTipQuery = { __typename?: 'Query', auctionItems: Array<{ __typename?: 'AuctionItem', updatedAt: Date }>; marketItems: Array<{ __typename?: 'MarketItem', updatedAt: Date }>, };


export const ContentCreateTabDataDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"ContentCreateTabData"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}],"kind":"Document"} as unknown as DocumentNode<ContentCreateTabDataQuery, ContentCreateTabDataQueryVariables>;
export const ContentCreateTabDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"ContentCreateTab"},"operation":"mutation","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"kind":"Field","name":{"kind":"Name","value":"contentCreate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentCreateInput"}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}],"kind":"Document"} as unknown as DocumentNode<ContentCreateTabMutation, ContentCreateTabMutationVariables>;
export const PredictRewardsTabDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"PredictRewardsTab"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}],"kind":"Document"} as unknown as DocumentNode<PredictRewardsTabQuery, PredictRewardsTabQueryVariables>;
export const UserListTabQueryDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"UserListTabQuery"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}},{"kind":"Field","name":{"kind":"Name","value":"refId"}}]}}]}}],"kind":"Document"} as unknown as DocumentNode<UserListTabQueryQuery, UserListTabQueryQueryVariables>;
export const ValidateRewardsTabDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"ValidateRewardsTab"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"contentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}],"kind":"Document"} as unknown as DocumentNode<ValidateRewardsTabQuery, ValidateRewardsTabQueryVariables>;
export const ContentRewardListTableDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"ContentRewardListTable"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"kind":"Field","name":{"kind":"Name","value":"contentList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isSellable"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentSeeMoreRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentListFilter"}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}]}],"kind":"Document"} as unknown as DocumentNode<ContentRewardListTableQuery, ContentRewardListTableQueryVariables>;
export const ContentGroupWageListTableDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"ContentGroupWageListTable"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"kind":"Field","name":{"kind":"Name","value":"contentGroupWageList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentIds"}},{"kind":"Field","name":{"kind":"Name","value":"durationText"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerHour"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerClear"}},{"kind":"Field","name":{"kind":"Name","value":"krwAmountPerHour"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentGroupWageListFilter"}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}]}],"kind":"Document"} as unknown as DocumentNode<ContentGroupWageListTableQuery, ContentGroupWageListTableQueryVariables>;
export const ContentWageListTableDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"ContentWageListTable"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"kind":"Field","name":{"kind":"Name","value":"contentWageList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"durationText"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}}]}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerHour"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerClear"}},{"kind":"Field","name":{"kind":"Name","value":"krwAmountPerHour"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentWageListFilter"}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}]}],"kind":"Document"} as unknown as DocumentNode<ContentWageListTableQuery, ContentWageListTableQueryVariables>;
export const ItemsFilterDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"ItemsFilter"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}],"kind":"Document"} as unknown as DocumentNode<ItemsFilterQuery, ItemsFilterQueryVariables>;
export const CustomContentWageCalculateDialogQueryDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"CustomContentWageCalculateDialogQuery"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}],"kind":"Document"} as unknown as DocumentNode<CustomContentWageCalculateDialogQueryQuery, CustomContentWageCalculateDialogQueryQueryVariables>;
export const CustomContentWageCalculateDialogMutationDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"CustomContentWageCalculateDialogMutation"},"operation":"mutation","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"kind":"Field","name":{"kind":"Name","value":"customContentWageCalculate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"krwAmountPerHour"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerHour"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerClear"}},{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CustomContentWageCalculateInput"}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}],"kind":"Document"} as unknown as DocumentNode<CustomContentWageCalculateDialogMutationMutation, CustomContentWageCalculateDialogMutationMutationVariables>;
export const GoldExchangeRateSettingDialogDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"GoldExchangeRateSettingDialog"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goldExchangeRate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"krwAmount"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmount"}}]}}]}}],"kind":"Document"} as unknown as DocumentNode<GoldExchangeRateSettingDialogQuery, GoldExchangeRateSettingDialogQueryVariables>;
export const GoldExchangeRateEditDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"GoldExchangeRateEdit"},"operation":"mutation","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"kind":"Field","name":{"kind":"Name","value":"goldExchangeRateEdit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GoldExchangeRateEditInput"}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}],"kind":"Document"} as unknown as DocumentNode<GoldExchangeRateEditMutation, GoldExchangeRateEditMutationVariables>;
export const ContentWageListDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"ContentWageList"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goldExchangeRate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goldAmount"}},{"kind":"Field","name":{"kind":"Name","value":"krwAmount"}}]}}]}}],"kind":"Document"} as unknown as DocumentNode<ContentWageListQuery, ContentWageListQueryVariables>;
export const AuctionItemListTableDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"AuctionItemListTable"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"kind":"Field","name":{"kind":"Name","value":"auctionItemList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgBuyPrice"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"kind":"Field","name":{"kind":"Name","value":"auctionItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuctionItemListFilter"}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"VariableDefinition","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"VariableDefinition","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderByArg"}}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}]}],"kind":"Document"} as unknown as DocumentNode<AuctionItemListTableQuery, AuctionItemListTableQueryVariables>;
export const ExtraItemListTableDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"ExtraItemListTable"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NamedType","name":{"kind":"Name","value":"ItemsFilter"}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}]}],"kind":"Document"} as unknown as DocumentNode<ExtraItemListTableQuery, ExtraItemListTableQueryVariables>;
export const UserExtraItemPriceEditDialogDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"UserExtraItemPriceEditDialog"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}],"kind":"Document"} as unknown as DocumentNode<UserExtraItemPriceEditDialogQuery, UserExtraItemPriceEditDialogQueryVariables>;
export const UserItemPriceEditDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"UserItemPriceEdit"},"operation":"mutation","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"kind":"Field","name":{"kind":"Name","value":"userItemPriceEdit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserItemPriceEditInput"}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}],"kind":"Document"} as unknown as DocumentNode<UserItemPriceEditMutation, UserItemPriceEditMutationVariables>;
export const MarketItemListTableDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"MarketItemListTable"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"kind":"Field","name":{"kind":"Name","value":"marketItemList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bundleCount"}},{"kind":"Field","name":{"kind":"Name","value":"currentMinPrice"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"recentPrice"}},{"kind":"Field","name":{"kind":"Name","value":"yDayAvgPrice"}}]}},{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"kind":"Field","name":{"kind":"Name","value":"marketItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NamedType","name":{"kind":"Name","value":"MarketItemListFilter"}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"VariableDefinition","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"VariableDefinition","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderByArg"}}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}]}],"kind":"Document"} as unknown as DocumentNode<MarketItemListTableQuery, MarketItemListTableQueryVariables>;
export const ContentCategoriesDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"ContentCategories"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}],"kind":"Document"} as unknown as DocumentNode<ContentCategoriesQuery, ContentCategoriesQueryVariables>;
export const ContentDetailsDialogDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"ContentDetailsDialog"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contentId"}}}],"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isSellable"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentSeeMoreRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"level"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"contentId"}}}]}],"kind":"Document"} as unknown as DocumentNode<ContentDetailsDialogQuery, ContentDetailsDialogQueryVariables>;
export const ContentDetailsDialogWageSectionDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"ContentDetailsDialogWageSection"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contentId"}}}],"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"durationText"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"kind":"Field","name":{"kind":"Name","value":"wage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"krwAmountPerHour"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerHour"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerClear"}}]}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"contentId"}}},{"kind":"VariableDefinition","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentWageFilter"}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}]}],"kind":"Document"} as unknown as DocumentNode<ContentDetailsDialogWageSectionQuery, ContentDetailsDialogWageSectionQueryVariables>;
export const ContentDurationEditDialogDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"ContentDurationEditDialog"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}],"kind":"Document"} as unknown as DocumentNode<ContentDurationEditDialogQuery, ContentDurationEditDialogQueryVariables>;
export const ContentDurationEditDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"ContentDurationEdit"},"operation":"mutation","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"kind":"Field","name":{"kind":"Name","value":"contentDurationEdit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentDurationEditInput"}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}],"kind":"Document"} as unknown as DocumentNode<ContentDurationEditMutation, ContentDurationEditMutationVariables>;
export const ContentGroupDetailsDialogDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"ContentGroupDetailsDialog"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contentIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contentIds"}}}],"kind":"ObjectValue"}}],"kind":"Field","name":{"kind":"Name","value":"contentGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"contentIds"}}}]}],"kind":"Document"} as unknown as DocumentNode<ContentGroupDetailsDialogQuery, ContentGroupDetailsDialogQueryVariables>;
export const ContentGroupDurationEditDialogDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"ContentGroupDurationEditDialog"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contentIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}],"kind":"ObjectValue"}}],"kind":"Field","name":{"kind":"Name","value":"contentGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}],"kind":"ObjectValue"}}],"kind":"Field","name":{"kind":"Name","value":"contents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"gate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}],"kind":"Document"} as unknown as DocumentNode<ContentGroupDurationEditDialogQuery, ContentGroupDurationEditDialogQueryVariables>;
export const ContentDurationsEditDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"ContentDurationsEdit"},"operation":"mutation","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"kind":"Field","name":{"kind":"Name","value":"contentDurationsEdit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentDurationsEditInput"}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}],"kind":"Document"} as unknown as DocumentNode<ContentDurationsEditMutation, ContentDurationsEditMutationVariables>;
export const ContentRewardEditDialogDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"ContentRewardEditDialog"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isSellable"}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}],"kind":"Document"} as unknown as DocumentNode<ContentRewardEditDialogQuery, ContentRewardEditDialogQueryVariables>;
export const ContentRewardsEditDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"ContentRewardsEdit"},"operation":"mutation","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"kind":"Field","name":{"kind":"Name","value":"contentRewardsEdit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentRewardsEditInput"}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}],"kind":"Document"} as unknown as DocumentNode<ContentRewardsEditMutation, ContentRewardsEditMutationVariables>;
export const ContentRewardReportDialogDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"ContentRewardReportDialog"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isSellable"}}]}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}],"kind":"Document"} as unknown as DocumentNode<ContentRewardReportDialogQuery, ContentRewardReportDialogQueryVariables>;
export const ContentRewardsReportDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"ContentRewardsReport"},"operation":"mutation","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"kind":"Field","name":{"kind":"Name","value":"contentRewardsReport"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentRewardsReportInput"}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}],"kind":"Document"} as unknown as DocumentNode<ContentRewardsReportMutation, ContentRewardsReportMutationVariables>;
export const ContentSeeMoreRewardEditDialogDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"ContentSeeMoreRewardEditDialog"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentSeeMoreRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}],"kind":"Document"} as unknown as DocumentNode<ContentSeeMoreRewardEditDialogQuery, ContentSeeMoreRewardEditDialogQueryVariables>;
export const ContentSeeMoreRewardsEditDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"ContentSeeMoreRewardsEdit"},"operation":"mutation","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"kind":"Field","name":{"kind":"Name","value":"contentSeeMoreRewardsEdit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentSeeMoreRewardsEditInput"}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}],"kind":"Document"} as unknown as DocumentNode<ContentSeeMoreRewardsEditMutation, ContentSeeMoreRewardsEditMutationVariables>;
export const ItemStatUpdateToggleTipDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"ItemStatUpdateToggleTip"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"kind":"Field","name":{"kind":"Name","value":"marketItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"kind":"Field","name":{"kind":"Name","value":"auctionItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"VariableDefinition","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderByArg"}}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}]}],"kind":"Document"} as unknown as DocumentNode<ItemStatUpdateToggleTipQuery, ItemStatUpdateToggleTipQueryVariables>;