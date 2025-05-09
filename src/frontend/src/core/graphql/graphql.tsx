import {
  ApolloClient,
  ApolloProvider,
  FetchResult,
  InMemoryCache,
  createHttpLink,
  from,
  gql,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { ApolloProviderProps } from "@apollo/client/react/context";

export const GRAPHQL_ENDPOINT = "/graphql";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
  credentials: "include",
  headers: {
    "Apollo-Require-Preflight": "true",
  },
});

export const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache({
    addTypename: true,
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});

export const GraphQLProvider = (
  props: Omit<ApolloProviderProps<any>, "client">
) => <ApolloProvider client={client} {...props} />;

export { gql, useLazyQuery, useMutation, useQuery, type FetchResult };
