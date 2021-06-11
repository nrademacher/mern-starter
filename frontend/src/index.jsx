import { HttpLink, gql, ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import {Provider as ReduxProvider} from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import configureStore from './store';
import { setAuthToken } from './util/sessionApiUtil';
import { logout } from './actions/sessionActions';
import App from './components/App';
import './index.css';

const link = new HttpLink({
  uri: "http://localhost:5000/graphql"
});

// Map every data object to its unique id
const cache = new InMemoryCache({
  dataIdFromObject: (object) => object.id || null,
});

const token = localStorage.getItem("auth-token")

const VERIFY_USER = gql`
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token) {
      loggedIn
    }
  }
`;

cache.writeData({
  data: {
    isLoggedIn: false
  }
});

const client = new ApolloClient({
  link,
  cache,
    headers: {
    // pass our token into the header of each request
    authorization: token
  },
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  },
});


if (token) {
  client
    .mutate({ mutation: VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      console.log(data)
      cache.writeData({
        data: {
          isLoggedIn: data.verifyUser.loggedIn
        }
      });
      console.log(cache)
    });
}


document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (token) {
    setAuthToken(localStorage.jwtToken);

    const decodedUser = jwtDecode(token);
    const preloadedState = {
      session: { isAuthenticated: true, user: decodedUser },
    };

    store = configureStore(preloadedState);

    /* const currentTime = Date.now() / 1000;

    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.history.href = '/login';
    } */
  } else {
    store = configureStore({});
  }

  ReactDOM.render(
    <ApolloProvider client={client}>
    <ReduxProvider store={store}> 
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
    </ApolloProvider>,
    document.getElementById('root')
  );
});
