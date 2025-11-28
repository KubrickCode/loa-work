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
    graphQLErrors.forEach(({ locations, message, path }) => {
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
  credentials: "include",
  headers: {
    "Apollo-Require-Preflight": "true",
  },
  uri: GRAPHQL_ENDPOINT,
});

export const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: true,
  }),
  defaultOptions: {
    mutate: {
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
      fetchPolicy: "network-only",
    },
    watchQuery: {
      errorPolicy: "all",
      fetchPolicy: "network-only",
    },
  },
  link: from([errorLink, httpLink]),
});

export const GraphQLProvider = (props: Omit<ApolloProviderProps<any>, "client">) => (
  <ApolloProvider client={client} {...props} />
);

export { gql, useLazyQuery, useMutation, useQuery, type FetchResult };
