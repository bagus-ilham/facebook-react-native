import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";

const httpLink = createHttpLink({
  uri: "https://phasebook.bikdev.site/",
});

const authLink = setContext((_, { headers }) => {
  const token = SecureStore.getItemAsync("access_token");
  return {
    headers: {
      ...headers,
      "ngrok-skip-browser-warning": true,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;