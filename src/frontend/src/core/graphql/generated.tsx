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

export type Content = {
  __typename?: 'Content';
  contentRewards: Array<ContentReward>;
  createdAt: Scalars['DateTime']['output'];
  displayTypeName: Scalars['String']['output'];
  gate?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  isSeeMore?: Maybe<Scalars['Boolean']['output']>;
  level: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  type: ContentType;
  updatedAt: Scalars['DateTime']['output'];
};

export type ContentReward = {
  __typename?: 'ContentReward';
  averageQuantity: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isSellable: Scalars['Boolean']['output'];
  itemName: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum ContentType {
  CUBE = 'CUBE',
  EPIC_RAID = 'EPIC_RAID',
  GUARDIAN_RAID = 'GUARDIAN_RAID',
  KAZEROS_RAID = 'KAZEROS_RAID',
  KURZAN_FRONT = 'KURZAN_FRONT',
  LEGION_COMMANDER_RAID = 'LEGION_COMMANDER_RAID'
}

export type MinimumWage = {
  __typename?: 'MinimumWage';
  amount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  year: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  contentList: Array<Content>;
  contentRewardViewList: Array<Scalars['String']['output']>;
  minimumWage: MinimumWage;
};

export type ContentRewardListPageQueryVariables = Exact<{ [key: string]: never; }>;


export type ContentRewardListPageQuery = { __typename?: 'Query', contentRewardViewList: Array<string>, contentList: Array<{ __typename?: 'Content', displayTypeName: string, gate?: number | null, isSeeMore?: boolean | null, level: number, name: string, contentRewards: Array<{ __typename?: 'ContentReward', averageQuantity: number, isSellable: boolean, itemName: string }> }> };


export const ContentRewardListPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentRewardListPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentRewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"isSellable"}},{"kind":"Field","name":{"kind":"Name","value":"itemName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayTypeName"}},{"kind":"Field","name":{"kind":"Name","value":"gate"}},{"kind":"Field","name":{"kind":"Name","value":"isSeeMore"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentRewardViewList"}}]}}]} as unknown as DocumentNode<ContentRewardListPageQuery, ContentRewardListPageQueryVariables>;