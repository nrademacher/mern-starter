import { combineReducers } from 'redux';
import session from './sessionReducer';
import errors from './errorsReducer';
import tweets from './tweetsReducer';

const RootReducer = combineReducers({
  errors,
  session,
  tweets
});

export default RootReducer;
