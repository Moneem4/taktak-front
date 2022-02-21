import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
  fromPromise,
  gql,
  split, 
} from "@apollo/client";
import "apollo-upload-client";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";
import { REFRESH_TOKEN } from "../graphql/auth/mutations";
import { WebSocketLink } from '@apollo/client/link/ws';
import { Token } from "graphql";
import { Redirect } from "react-router";
import { getMainDefinition } from "apollo-utilities";

let apolloClient;

const refreshToken = () => {
  const actualRefreshToken = localStorage.getItem("refreshToken");
  if (actualRefreshToken !== null) {
    return apolloClient
      .mutate({
        mutation: REFRESH_TOKEN,
        variables: {
          refreshToken: actualRefreshToken,
        },
      })
      .then((result) => {
        localStorage.setItem(
          "accessToken",
          result.data.refreshToken.accessToken
        );
        return result.data.refreshToken.accessToken;
      });
  } else {
    return;
  }
};

const httpLink = createUploadLink({
  //uri: "https://api.taktak.com.tn/graphql",
  uri: "http://localhost:4060/graphql",
  headers: {
    "keep-alive": "true",
  },
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4060/graphql",
  options: {
    reconnect: true,
    reconnectionAttempts: 2,
      connectionParams: {
        "ACCESS_TOKEN": localStorage['accessToken'],
      },
  }
});
 
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const defaultOptions = {
  watchQuery: { fetchPolicy: "cache-end-network", errorPolicy: "ignore" },
  query: { fetchPolicy: "network-only", errorPolicy: "all" },
  mutate: { errorPolicy: "all" },
};

let authLink = new ApolloLink((operation, forward) => {
  operation.setContext(async () => {
    const token = await localStorage.getItem("accessToken");
    if (token !== null) {
      return {
        headers: {
          "access-token": token,
        },
      };
    } else {
      return {
        headers: {},
      };
    }
  });
  return forward(operation);
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.code) {
          case "UNAUTHENTICATED":
             return fromPromise(
               refreshToken().catch((error) => {
                  //  Handle token refresh errors e.g clear stored tokens, redirect to login
                  return;
               })
             )
               .filter((value) => Boolean(value))
               .flatMap((accessToken) => {
                 const oldHeaders = operation.getContext().headers;
                 // modify the operation context with a new token
                 operation.setContext({
                   headers: {
                     ...oldHeaders,
                     "access-token": `${accessToken}`,
                   },
                 });
                //  retry the request, returning the new observable
                return forward(operation);
               });
            break;
          default:
            break;
        }
      }
    }
  }
);

apolloClient = new ApolloClient({
  //link: ApolloLink.from([errorLink, authLink, httpLink, wsLink]),
  link: ApolloLink.from([errorLink, authLink, splitLink]),
  cache: new InMemoryCache(),
  defaultOptions
});

export default apolloClient;
