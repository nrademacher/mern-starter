import React, {useEffect} from "react";
import { useQuery, useApolloClient } from "react-apollo";
import { gql } from "apollo-boost";
import { Route, Redirect, withRouter } from "react-router-dom";

export const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const Auth = ({ component: Component, path, exact }) => {
  const {data, loading} = useQuery(IS_LOGGED_IN, {fetchPolicy: "network-only"})

  if (loading) return null
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        !data.isLoggedIn ? <Component {...props} /> : <Redirect to="/tweets" />
      }
    />
  );
};

const Protected = ({ component: Component, ...rest }) => {
  const {data, loading, refetch} = useQuery(IS_LOGGED_IN, {fetchPolicy: "network-only"})

  if (loading) return null

  return (
    <Route
      {...rest}
      render={(props) =>
        data.isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export const AuthRoute = withRouter(Auth);

export const ProtectedRoute = withRouter(Protected);
