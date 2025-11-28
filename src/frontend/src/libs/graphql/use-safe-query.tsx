import {
  DocumentNode,
  NoInfer,
  OperationVariables,
  SuspenseQueryHookOptions,
  TypedDocumentNode,
  UseSuspenseQueryResult,
  useSuspenseQuery,
} from "@apollo/client";
import { startTransition, useCallback } from "react";

export const useSafeQuery = <
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: SuspenseQueryHookOptions<NoInfer<TData>, NoInfer<TVariables>>
): UseSuspenseQueryResult<TData, TVariables> => {
  const {
    data,
    error,
    refetch: queryRefetch,
    ...otherProps
  } = useSuspenseQuery<TData>(query, options);

  const refetch = useCallback(() => {
    startTransition(() => {
      queryRefetch();
    });
  }, [queryRefetch]);

  if (error) throw error;
  if (!data) throw new Error("Data is not loaded");

  return {
    data,
    refetch,
    ...otherProps,
  } as UseSuspenseQueryResult<TData, TVariables>;
};
