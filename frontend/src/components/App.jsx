import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/routeUtil';
import { Switch } from 'react-router-dom';
import NavBar from './NavBar';
import AllPosts from './posts/AllPosts';
import MainPage from './main/MainPage';
import LoginForm from './session/LoginForm';
import SignupForm from './session/SignupForm';
import UserPosts from './profile/UserPosts';
import PostCompose from './posts/PostCompose';

const App = () => (
  <div className="min-h-screen bg-base-100 text-primary-content subpixel-antialiased">
    <NavBar />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginForm} />
      <AuthRoute exact path="/signup" component={SignupForm} />

      <ProtectedRoute exact path="/posts" component={AllPosts} />
      <ProtectedRoute exact path="/profile" component={UserPosts} />
      <ProtectedRoute exact path="/new_post" component={PostCompose} />
    </Switch>
  </div>
);

export default App;
