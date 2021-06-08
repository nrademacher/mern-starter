import { connect } from 'react-redux';
import { fetchUserTweets, removeTweet } from '../../actions/tweetActions';
import UserTweets from './UserTweets';

const mapStateToProps = (state) => {
  return {
    tweets: Object.values(state.tweets.user),
    currentUser: state.session.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserTweets: id => dispatch(fetchUserTweets(id)),
    removeTweet: (userId, tweetId) => dispatch(removeTweet(userId, tweetId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTweets);
