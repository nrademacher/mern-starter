import { combineReducers } from 'redux';
import session from './sessionReducer';
import errors from './errorsReducer';
import posts from './postsReducer';

const RootReducer = combineReducers({
  errors,
  session,
  posts
});

export default RootReducer;
