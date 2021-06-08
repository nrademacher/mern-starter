import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/routeUtil';
import { Switch } from 'react-router-dom';
import NavBar from './NavBar';
import AllTweets from './tweets/AllTweets';
import MainPage from './main/MainPage';
import LoginForm from './session/LoginForm';
import SignupForm from './session/SignupForm';
import UserTweets from './profile/UserTweets';
import TweetCompose from './tweets/TweetCompose';

const App = () => (
  <div className="min-h-screen bg-base-100 text-primary-content subpixel-antialiased">
    <NavBar />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginForm} />
      <AuthRoute exact path="/signup" component={SignupForm} />

      <ProtectedRoute exact path="/tweets" component={AllTweets} />
      <ProtectedRoute exact path="/profile" component={UserTweets} />
      <ProtectedRoute exact path="/new_tweet" component={TweetCompose} />
    </Switch>
  </div>
);

export default App;
