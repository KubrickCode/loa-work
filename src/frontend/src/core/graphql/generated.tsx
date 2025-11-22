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

/** 경매장 아이템 */
export type AuctionItem = {
  __typename?: 'AuctionItem';
  /** 평균 낙찰가 */
  avgBuyPrice: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  /** 아이템 이미지 URL */
  imageUrl: Scalars['String']['output'];
  /** 통계 수집 활성화 여부 */
  isStatScraperEnabled: Scalars['Boolean']['output'];
  /** 아이템명 */
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AuctionItemListFilter = {
  /** 통계 수집 활성화 여부 */
  isStatScraperEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** 아이템명 검색 키워드 */
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
  /** 컨텐츠 카테고리 ID */
  contentCategoryId: Scalars['Int']['output'];
  contentRewards: Array<ContentReward>;
  contentSeeMoreRewards: Array<ContentSeeMoreReward>;
  createdAt: Scalars['DateTime']['output'];
  displayName: Scalars['String']['output'];
  duration: Scalars['Int']['output'];
  durationText: Scalars['String']['output'];
  /** 관문 */
  gate?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  /** 레벨 */
  level: Scalars['Int']['output'];
  /** 이름 */
  name: Scalars['String']['output'];
  /** 상태 */
  status: ContentStatus;
  updatedAt: Scalars['DateTime']['output'];
  wage: ContentWage;
};


export type ContentWageArgs = {
  filter?: InputMaybe<ContentWageFilter>;
};

export type ContentCategory = {
  __typename?: 'ContentCategory';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  /** 이미지 URL */
  imageUrl: Scalars['String']['output'];
  /** 이름 */
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ContentConnection = {
  __typename?: 'ContentConnection';
  /** 엣지 목록 */
  edges: Array<ContentEdge>;
  /** 페이지 정보 */
  pageInfo: ContentPageInfo;
  /** 전체 개수 */
  totalCount: Scalars['Int']['output'];
};

export type ContentCreateInput = {
  /** 컨텐츠 카테고리 ID */
  categoryId: Scalars['Int']['input'];
  /** 컨텐츠 보상 목록 */
  contentRewards: Array<ContentCreateItemInput>;
  /** 더보기 컨텐츠 보상 목록 */
  contentSeeMoreRewards?: InputMaybe<Array<ContentCreateSeeMoreRewardInput>>;
  /** 소요 시간 (초 단위) */
  duration: Scalars['Int']['input'];
  /** 관문 */
  gate?: InputMaybe<Scalars['Int']['input']>;
  /** 레벨 */
  level: Scalars['Int']['input'];
  /** 이름 */
  name: Scalars['String']['input'];
};

export type ContentCreateItemInput = {
  /** 평균 획득 수량 */
  averageQuantity: Scalars['Float']['input'];
  /** 귀속 여부 */
  isBound: Scalars['Boolean']['input'];
  /** 아이템 ID */
  itemId: Scalars['Int']['input'];
};

export type ContentCreateResult = {
  __typename?: 'ContentCreateResult';
  /** 성공 여부 */
  ok: Scalars['Boolean']['output'];
};

export type ContentCreateSeeMoreRewardInput = {
  /** 아이템 ID */
  itemId: Scalars['Int']['input'];
  /** 수량 */
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
  /** 컨텐츠 ID */
  contentId: Scalars['Int']['input'];
  /** 분 */
  minutes: Scalars['Int']['input'];
  /** 초 */
  seconds: Scalars['Int']['input'];
};

export type ContentDurationEditResult = {
  __typename?: 'ContentDurationEditResult';
  /** 성공 여부 */
  ok: Scalars['Boolean']['output'];
};

export type ContentDurationsEditInput = {
  /** 컨텐츠 소요 시간 목록 */
  contentDurations: Array<ContentDurationEditInput>;
};

export type ContentDurationsEditResult = {
  __typename?: 'ContentDurationsEditResult';
  /** 성공 여부 */
  ok: Scalars['Boolean']['output'];
};

export type ContentEdge = {
  __typename?: 'ContentEdge';
  /** 커서 */
  cursor: Scalars['String']['output'];
  /** 노드 */
  node: Content;
};

export type ContentFilterArgs = {
  /** 컨텐츠 카테고리 ID */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** 관문 */
  gate?: InputMaybe<Scalars['Int']['input']>;
  /** 컨텐츠 ID 목록 */
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** 레벨 */
  level?: InputMaybe<Scalars['Int']['input']>;
  /** 이름 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 상태 */
  status?: InputMaybe<ContentStatus>;
};

export type ContentGroup = {
  __typename?: 'ContentGroup';
  contentCategory: ContentCategory;
  /** 컨텐츠 카테고리 ID */
  contentCategoryId: Scalars['Int']['output'];
  /** 컨텐츠 ID 목록 */
  contentIds: Array<Scalars['Int']['output']>;
  contents: Array<Content>;
  duration: Scalars['Int']['output'];
  durationText: Scalars['String']['output'];
  /** 레벨 */
  level: Scalars['Int']['output'];
  /** 이름 */
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

export type ContentPageInfo = {
  __typename?: 'ContentPageInfo';
  /** 끝 커서 */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** 다음 페이지 존재 여부 */
  hasNextPage: Scalars['Boolean']['output'];
  /** 이전 페이지 존재 여부 */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** 시작 커서 */
  startCursor?: Maybe<Scalars['String']['output']>;
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
  /** 평균 획득 수량 */
  averageQuantity: Scalars['Float']['input'];
  /** 컨텐츠 ID */
  contentId: Scalars['Int']['input'];
  /** 거래 가능 여부 */
  isSellable: Scalars['Boolean']['input'];
  /** 아이템 ID */
  itemId: Scalars['Int']['input'];
};

export type ContentRewardReportInput = {
  averageQuantity: Scalars['Float']['input'];
  id: Scalars['Int']['input'];
};

export type ContentRewardsEditInput = {
  /** 컨텐츠 보상 목록 */
  contentRewards: Array<ContentRewardEditInput>;
  /** 제보 가능 여부 */
  isReportable: Scalars['Boolean']['input'];
};

export type ContentRewardsEditResult = {
  __typename?: 'ContentRewardsEditResult';
  /** 성공 여부 */
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
  /** 컨텐츠 ID */
  contentId: Scalars['Int']['input'];
  /** 아이템 ID */
  itemId: Scalars['Int']['input'];
  /** 수량 */
  quantity: Scalars['Float']['input'];
};

export type ContentSeeMoreRewardsEditInput = {
  /** 더보기 컨텐츠 보상 목록 */
  contentSeeMoreRewards: Array<ContentSeeMoreRewardEditInput>;
};

export type ContentSeeMoreRewardsEditResult = {
  __typename?: 'ContentSeeMoreRewardsEditResult';
  /** 성공 여부 */
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
  /** 아이템 목록 */
  items: Array<CustomContentWageCalculateItemInput>;
  /** 분 */
  minutes: Scalars['Int']['input'];
  /** 초 */
  seconds: Scalars['Int']['input'];
};

export type CustomContentWageCalculateItemInput = {
  /** 아이템 ID */
  id: Scalars['Int']['input'];
  /** 수량 */
  quantity: Scalars['Float']['input'];
};

export type CustomContentWageCalculateResult = {
  __typename?: 'CustomContentWageCalculateResult';
  /** 클리어당 골드 획득량 */
  goldAmountPerClear: Scalars['Int']['output'];
  /** 시간당 골드 획득량 */
  goldAmountPerHour: Scalars['Int']['output'];
  /** 시간당 원화 환산 금액 */
  krwAmountPerHour: Scalars['Int']['output'];
  /** 성공 여부 */
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

/** 거래소 아이템 */
export type MarketItem = {
  __typename?: 'MarketItem';
  /** 묶음 개수 */
  bundleCount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  /** 현재 최저가 */
  currentMinPrice: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  /** 아이템 이미지 URL */
  imageUrl: Scalars['String']['output'];
  /** 통계 수집 활성화 여부 */
  isStatScraperEnabled: Scalars['Boolean']['output'];
  /** 아이템명 */
  name: Scalars['String']['output'];
  /** 최근 거래가 */
  recentPrice: Scalars['Float']['output'];
  /** Lost Ark API Reference ID */
  refId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  /** 전일 평균 거래가 */
  yDayAvgPrice: Scalars['Float']['output'];
};

export type MarketItemListFilter = {
  /** 카테고리명 필터 */
  categoryName?: InputMaybe<Scalars['String']['input']>;
  /** 등급 필터 */
  grade?: InputMaybe<Scalars['String']['input']>;
  /** 통계 수집 활성화 여부 */
  isStatScraperEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** 아이템명 검색 키워드 */
  keyword?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  contentCreate: ContentCreateResult;
  contentDelete: ContentCreateResult;
  contentDurationEdit: ContentDurationEditResult;
  contentDurationsEdit: ContentDurationsEditResult;
  contentRewardsEdit: ContentRewardsEditResult;
  contentRewardsReport: ContentRewardsReportResult;
  contentSeeMoreRewardsEdit: ContentSeeMoreRewardsEditResult;
  contentUpdate: ContentCreateResult;
  customContentWageCalculate: CustomContentWageCalculateResult;
  goldExchangeRateEdit: GoldExchangeRateEditResult;
  userItemPriceEdit: UserItemPriceEditResult;
};


export type MutationContentCreateArgs = {
  input: ContentCreateInput;
};


export type MutationContentDeleteArgs = {
  id: Scalars['Int']['input'];
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


export type MutationContentUpdateArgs = {
  id: Scalars['Int']['input'];
  input: UpdateContentInput;
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
  /** 경매장 아이템 목록 조회 */
  auctionItemList: Array<AuctionItem>;
  /** 경매장 아이템 정렬 조회 */
  auctionItems: Array<AuctionItem>;
  content: Content;
  contentCategories: Array<ContentCategory>;
  contentDuration: ContentDuration;
  contentGroup: ContentGroup;
  contentGroupWageList: Array<ContentGroupWage>;
  contentList: Array<Content>;
  contentWageList: Array<ContentWage>;
  contents: Array<Content>;
  contentsConnection: ContentConnection;
  goldExchangeRate: GoldExchangeRate;
  item: Item;
  items: Array<Item>;
  /** 거래소 아이템 목록 조회 */
  marketItemList: Array<MarketItem>;
  /** 거래소 아이템 정렬 조회 */
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


export type QueryContentsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<ContentFilterArgs>;
  first?: InputMaybe<Scalars['Int']['input']>;
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

export type UpdateContentInput = {
  /** 관문 */
  gate?: InputMaybe<Scalars['Int']['input']>;
  /** 레벨 */
  level?: InputMaybe<Scalars['Int']['input']>;
  /** 이름 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 상태 */
  status?: InputMaybe<ContentStatus>;
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
  /** 아이템 ID */
  id: Scalars['Int']['input'];
  /** 가격 */
  price: Scalars['Float']['input'];
};

export type UserItemPriceEditResult = {
  __typename?: 'UserItemPriceEditResult';
  /** 성공 여부 */
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


export type ValidateRewardsTabQuery = { __typename?: 'Query', contentList: Array<{ __typename?: 'Content', id: number, level: number, contentCategory: { __typename?: 'ContentCategory', name: string } }> };

export type ContentRewardListTableQueryVariables = Exact<{
  filter?: InputMaybe<ContentListFilter>;
}>;


export type ContentRewardListTableQuery = { __typename?: 'Query', contentList: Array<{ __typename?: 'Content', displayName: string, id: number, level: number, contentCategory: { __typename?: 'ContentCategory', imageUrl: string, name: string }, contentRewards: Array<{ __typename?: 'ContentReward', averageQuantity: number, isSellable: boolean, item: { __typename?: 'Item', name: string } }>, contentSeeMoreRewards: Array<{ __typename?: 'ContentSeeMoreReward', quantity: number, item: { __typename?: 'Item', name: string } }> }>, items: Array<{ __typename?: 'Item', imageUrl: string, name: string }> };

export type ContentGroupWageListTableQueryVariables = Exact<{
  filter?: InputMaybe<ContentGroupWageListFilter>;
}>;


export type ContentGroupWageListTableQuery = { __typename?: 'Query', contentGroupWageList: Array<{ __typename?: 'ContentGroupWage', goldAmountPerHour: number, goldAmountPerClear: number, krwAmountPerHour: number, contentGroup: { __typename?: 'ContentGroup', contentIds: Array<number>, durationText: string, level: number, name: string, contentCategory: { __typename?: 'ContentCategory', id: number, imageUrl: string, name: string } } }> };

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

export type ContentWageListQueryVariables = Exact<{ [key: string]: never; }>;


export type ContentWageListQuery = { __typename?: 'Query', goldExchangeRate: { __typename?: 'GoldExchangeRate', goldAmount: number, krwAmount: number } };

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

export type UserItemPriceEditMutationVariables = Exact<{
  input: UserItemPriceEditInput;
}>;


export type UserItemPriceEditMutation = { __typename?: 'Mutation', userItemPriceEdit: { __typename?: 'UserItemPriceEditResult', ok: boolean } };

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
export const UserListTabQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserListTabQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}},{"kind":"Field","name":{"kind":"Name","value":"refId"}}]}}]}}]} as unknown as DocumentNode<UserListTabQueryQuery, UserListTabQueryQueryVariables>;
export const ValidateRewardsTabDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ValidateRewardsTab"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"contentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ValidateRewardsTabQuery, ValidateRewardsTabQueryVariables>;
export const ContentRewardListTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentRewardListTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentListFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isSellable"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentSeeMoreRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ContentRewardListTableQuery, ContentRewardListTableQueryVariables>;
export const ContentGroupWageListTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentGroupWageListTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentGroupWageListFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentGroupWageList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentIds"}},{"kind":"Field","name":{"kind":"Name","value":"durationText"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerHour"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerClear"}},{"kind":"Field","name":{"kind":"Name","value":"krwAmountPerHour"}}]}}]}}]} as unknown as DocumentNode<ContentGroupWageListTableQuery, ContentGroupWageListTableQueryVariables>;
export const ContentWageListTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentWageListTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentWageListFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentWageList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"durationText"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}}]}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerHour"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerClear"}},{"kind":"Field","name":{"kind":"Name","value":"krwAmountPerHour"}}]}}]}}]} as unknown as DocumentNode<ContentWageListTableQuery, ContentWageListTableQueryVariables>;
export const ItemsFilterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ItemsFilter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ItemsFilterQuery, ItemsFilterQueryVariables>;
export const CustomContentWageCalculateDialogQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CustomContentWageCalculateDialogQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CustomContentWageCalculateDialogQueryQuery, CustomContentWageCalculateDialogQueryQueryVariables>;
export const CustomContentWageCalculateDialogMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CustomContentWageCalculateDialogMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CustomContentWageCalculateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customContentWageCalculate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"krwAmountPerHour"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerHour"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmountPerClear"}},{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<CustomContentWageCalculateDialogMutationMutation, CustomContentWageCalculateDialogMutationMutationVariables>;
export const GoldExchangeRateSettingDialogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GoldExchangeRateSettingDialog"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goldExchangeRate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"krwAmount"}},{"kind":"Field","name":{"kind":"Name","value":"goldAmount"}}]}}]}}]} as unknown as DocumentNode<GoldExchangeRateSettingDialogQuery, GoldExchangeRateSettingDialogQueryVariables>;
export const GoldExchangeRateEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GoldExchangeRateEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GoldExchangeRateEditInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goldExchangeRateEdit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<GoldExchangeRateEditMutation, GoldExchangeRateEditMutationVariables>;
export const ContentWageListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentWageList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goldExchangeRate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goldAmount"}},{"kind":"Field","name":{"kind":"Name","value":"krwAmount"}}]}}]}}]} as unknown as DocumentNode<ContentWageListQuery, ContentWageListQueryVariables>;
export const AuctionItemListTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AuctionItemListTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AuctionItemListFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderByArg"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auctionItemList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgBuyPrice"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"auctionItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AuctionItemListTableQuery, AuctionItemListTableQueryVariables>;
export const ExtraItemListTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExtraItemListTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ItemsFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<ExtraItemListTableQuery, ExtraItemListTableQueryVariables>;
export const UserExtraItemPriceEditDialogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserExtraItemPriceEditDialog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"item"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]}}]} as unknown as DocumentNode<UserExtraItemPriceEditDialogQuery, UserExtraItemPriceEditDialogQueryVariables>;
export const UserItemPriceEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserItemPriceEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserItemPriceEditInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userItemPriceEdit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<UserItemPriceEditMutation, UserItemPriceEditMutationVariables>;
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