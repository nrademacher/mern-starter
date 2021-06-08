import {
  getTweets,
  getUserTweets,
  writeTweet,
  updateTweet,
  deleteTweet
} from '../util/tweetApiUtil';

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const RECEIVE_USER_TWEETS = 'RECEIVE_USER_TWEETS';
export const RECEIVE_NEW_TWEET = 'RECEIVE_NEW_TWEET';
export const RECEIVE_UPDATE_TWEET = 'RECEIVE_UPDATE_TWEET';
export const RECEIVE_DELETE_TWEET = 'RECEIVE_DELETE_TWEET';

export const receiveTweets = (tweets) => ({
  type: RECEIVE_TWEETS,
  tweets,
});

export const receiveUserTweets = (tweets) => ({
  type: RECEIVE_USER_TWEETS,
  tweets,
});

export const receiveNewTweet = (tweet) => ({
  type: RECEIVE_NEW_TWEET,
  tweet,
});

export const receiveUpdateTweet = (payload) => ({
  type: RECEIVE_UPDATE_TWEET,
  payload,
});

export const receiveDeleteTweet = (payload) => ({
  type: RECEIVE_DELETE_TWEET,
  payload,
});

export const fetchTweets = () => (dispatch) =>
  getTweets()
    .then((tweets) => dispatch(receiveTweets(tweets)))
    .catch((err) => console.log(err));

export const fetchUserTweets = (id) => (dispatch) =>
  getUserTweets(id)
    .then((tweets) => dispatch(receiveUserTweets(tweets)))
    .catch((err) => console.log(err));

export const composeTweet = (data) => (dispatch) =>
  writeTweet(data)
    .then((tweet) => dispatch(receiveNewTweet(tweet)))
    .catch((err) => console.log(err));

export const editTweet = (userId, tweetId, data) => (dispatch) => {
  updateTweet(userId, tweetId, data)
    .then((tweet) => dispatch(receiveUpdateTweet(tweet)))
    .catch((err) => console.log(err));
}

export const removeTweet = (userId, tweetId) => (dispatch) =>
  deleteTweet(userId, tweetId)
    .then((tweet) => dispatch(receiveDeleteTweet(tweet)))
    .catch((err) => console.log(err));
