import {
  RECEIVE_TWEETS,
  RECEIVE_USER_TWEETS,
  RECEIVE_NEW_TWEET,
  RECEIVE_UPDATE_TWEET,
  RECEIVE_DELETE_TWEET,
} from '../actions/tweetActions';

const TweetsReducer = (
  state = { all: {}, user: {}, new: undefined },
  action
) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_TWEETS:
      newState.all = action.tweets.data;
      return newState;
    case RECEIVE_USER_TWEETS:
      newState.user = action.tweets.data;
      return newState;
    case RECEIVE_NEW_TWEET:
      newState.new = action.tweet.data;
      return newState;
    case RECEIVE_UPDATE_TWEET:
      let upUrlArr = action.payload.config.url.split('/');
      let upIdFromUrl = upUrlArr[upUrlArr.length - 1];
      let tweet = newState.user.find((tweet) => tweet._id === upIdFromUrl);
      if (tweet) {
        tweet.text = JSON.parse(action.payload.config.data).text;
      }
      return newState;
    case RECEIVE_DELETE_TWEET:
      let delUrlArr = action.payload.config.url.split('/');
      let delIdFromUrl = delUrlArr[delUrlArr.length - 1];
      newState.user = newState.user.filter((tweet) => tweet._id !== delIdFromUrl);
      return newState;
    default:
      return state;
  }
};

export default TweetsReducer;
