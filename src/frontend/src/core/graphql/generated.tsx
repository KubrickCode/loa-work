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
  avgBuyPrice?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  imageSrc: Scalars['String']['output'];
  isStatScraperEnabled: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AuctionItemListFilter = {
  isStatScraperEnabled?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Content = {
  __typename?: 'Content';
  contentCategory: ContentCategory;
  contentCategoryId: Scalars['Int']['output'];
  contentRewards: Array<ContentReward>;
  createdAt: Scalars['DateTime']['output'];
  displayName: Scalars['String']['output'];
  duration: Scalars['Int']['output'];
  durationText: Scalars['String']['output'];
  gate?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  isSeeMore?: Maybe<Scalars['Boolean']['output']>;
  level: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  wageFilter?: Maybe<ContentWageFilter>;
};

export type ContentCategory = {
  __typename?: 'ContentCategory';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ContentListFilter = {
  contentCategoryId?: InputMaybe<Scalars['Int']['input']>;
  includeIsSeeMore?: InputMaybe<Scalars['Boolean']['input']>;
  wageFilter?: InputMaybe<ContentListWageFilter>;
};

export type ContentListWageFilter = {
  includeContentRewardItems?: InputMaybe<Array<Scalars['String']['input']>>;
  includeIsBound?: InputMaybe<Scalars['Boolean']['input']>;
  includeIsSeeMore?: InputMaybe<Scalars['Boolean']['input']>;
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
};

export type ContentRewardEditInput = {
  averageQuantity: Scalars['Float']['input'];
  id: Scalars['Float']['input'];
};

export type ContentRewardItem = {
  __typename?: 'ContentRewardItem';
  createdAt: Scalars['DateTime']['output'];
  defaultPrice: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ContentRewardsEditInput = {
  contentRewards: Array<ContentRewardEditInput>;
};

export type ContentRewardsEditResult = {
  __typename?: 'ContentRewardsEditResult';
  ok: Scalars['Boolean']['output'];
};

export type ContentWage = {
  __typename?: 'ContentWage';
  content: Content;
  contentId: Scalars['Int']['output'];
  goldAmount: Scalars['Int']['output'];
  krwAmount: Scalars['Int']['output'];
};

export type ContentWageFilter = {
  __typename?: 'ContentWageFilter';
  includeContentRewardItems?: Maybe<Array<Scalars['String']['output']>>;
  includeIsBound?: Maybe<Scalars['Boolean']['output']>;
  includeIsSeeMore?: Maybe<Scalars['Boolean']['output']>;
};

export type ContentWageListFilter = {
  contentCategoryId?: InputMaybe<Scalars['Int']['input']>;
  includeContentRewardItemIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  includeIsBound?: InputMaybe<Scalars['Boolean']['input']>;
  includeIsSeeMore?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MarketItem = {
  __typename?: 'MarketItem';
  bundleCount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  currentMinPrice: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  imageSrc: Scalars['String']['output'];
  isStatScraperEnabled: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  recentPrice: Scalars['Int']['output'];
  refId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  yDayAvgPrice: Scalars['Float']['output'];
};

export type MarketItemListFilter = {
  isStatScraperEnabled?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MinimumWage = {
  __typename?: 'MinimumWage';
  amount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  year: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  contentRewardsEdit: ContentRewardsEditResult;
};


export type MutationContentRewardsEditArgs = {
  input: ContentRewardsEditInput;
};

export type Query = {
  __typename?: 'Query';
  auctionItemList: Array<AuctionItem>;
  content: Content;
  contentCategories: Array<ContentCategory>;
  contentList: Array<Content>;
  contentRewardItems: Array<ContentRewardItem>;
  contentWageList: Array<ContentWage>;
  marketItemList: Array<MarketItem>;
  minimumWage: MinimumWage;
};


export type QueryAuctionItemListArgs = {
  filter?: InputMaybe<AuctionItemListFilter>;
};


export type QueryContentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryContentListArgs = {
  filter?: InputMaybe<ContentListFilter>;
};


export type QueryContentWageListArgs = {
  filter?: InputMaybe<ContentWageListFilter>;
};


export type QueryMarketItemListArgs = {
  filter?: InputMaybe<MarketItemListFilter>;
};

export type ContentRewardEditDialogQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ContentRewardEditDialogQuery = { __typename?: 'Query', content: { __typename?: 'Content', contentRewards: Array<{ __typename?: 'ContentReward', averageQuantity: number, id: number, isSellable: boolean, contentRewardItem: { __typename?: 'ContentRewardItem', name: string } }> } };

export type ContentRewardsEditMutationVariables = Exact<{
  input: ContentRewardsEditInput;
}>;


export type ContentRewardsEditMutation = { __typename?: 'Mutation', contentRewardsEdit: { __typename?: 'ContentRewardsEditResult', ok: boolean } };

export type ContentRewardListTableQueryVariables = Exact<{
  filter?: InputMaybe<ContentListFilter>;
}>;


export type ContentRewardListTableQuery = { __typename?: 'Query', contentList: Array<{ __typename?: 'Content', displayName: string, durationText: string, id: number, level: number, contentCategory: { __typename?: 'ContentCategory', name: string }, contentRewards: Array<{ __typename?: 'ContentReward', averageQuantity: number, isSellable: boolean, contentRewardItem: { __typename?: 'ContentRewardItem', name: string } }> }>, contentRewardItems: Array<{ __typename?: 'ContentRewardItem', name: string }> };

export type ContentWageListTableQueryVariables = Exact<{
  filter?: InputMaybe<ContentWageListFilter>;
}>;


export type ContentWageListTableQuery = { __typename?: 'Query', contentWageList: Array<{ __typename?: 'ContentWage', goldAmount: number, krwAmount: number, content: { __typename?: 'Content', displayName: string, contentCategory: { __typename?: 'ContentCategory', name: string } } }> };

export type ContentRewardItemsFilterQueryVariables = Exact<{ [key: string]: never; }>;


export type ContentRewardItemsFilterQuery = { __typename?: 'Query', contentRewardItems: Array<{ __typename?: 'ContentRewardItem', id: number, name: string }> };

export type AuctionItemListTableQueryVariables = Exact<{
  filter?: InputMaybe<AuctionItemListFilter>;
}>;


export type AuctionItemListTableQuery = { __typename?: 'Query', auctionItemList: Array<{ __typename?: 'AuctionItem', avgBuyPrice?: number | null, imageSrc: string, name: string }> };

export type MarketItemListTableQueryVariables = Exact<{
  filter?: InputMaybe<MarketItemListFilter>;
}>;


export type MarketItemListTableQuery = { __typename?: 'Query', marketItemList: Array<{ __typename?: 'MarketItem', bundleCount: number, currentMinPrice: number, imageSrc: string, name: string, recentPrice: number, yDayAvgPrice: number }> };

export type ContentCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ContentCategoriesQuery = { __typename?: 'Query', contentCategories: Array<{ __typename?: 'ContentCategory', id: number, name: string }> };


export const ContentRewardEditDialogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentRewardEditDialog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"contentRewardItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isSellable"}}]}}]}}]}}]} as unknown as DocumentNode<ContentRewardEditDialogQuery, ContentRewardEditDialogQueryVariables>;
export const ContentRewardsEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ContentRewardsEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentRewardsEditInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentRewardsEdit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<ContentRewardsEditMutation, ContentRewardsEditMutationVariables>;
export const ContentRewardListTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentRewardListTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentListFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"contentRewardItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isSellable"}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"durationText"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentRewardItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ContentRewardListTableQuery, ContentRewardListTableQueryVariables>;
export const ContentWageListTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentWageListTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentWageListFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentWageList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"goldAmount"}},{"kind":"Field","name":{"kind":"Name","value":"krwAmount"}}]}}]}}]} as unknown as DocumentNode<ContentWageListTableQuery, ContentWageListTableQueryVariables>;
export const ContentRewardItemsFilterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentRewardItemsFilter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentRewardItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ContentRewardItemsFilterQuery, ContentRewardItemsFilterQueryVariables>;
export const AuctionItemListTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AuctionItemListTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AuctionItemListFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auctionItemList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgBuyPrice"}},{"kind":"Field","name":{"kind":"Name","value":"imageSrc"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AuctionItemListTableQuery, AuctionItemListTableQueryVariables>;
export const MarketItemListTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MarketItemListTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MarketItemListFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"marketItemList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bundleCount"}},{"kind":"Field","name":{"kind":"Name","value":"currentMinPrice"}},{"kind":"Field","name":{"kind":"Name","value":"imageSrc"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"recentPrice"}},{"kind":"Field","name":{"kind":"Name","value":"yDayAvgPrice"}}]}}]}}]} as unknown as DocumentNode<MarketItemListTableQuery, MarketItemListTableQueryVariables>;
export const ContentCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ContentCategoriesQuery, ContentCategoriesQueryVariables>;