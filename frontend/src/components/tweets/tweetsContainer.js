import { connect } from 'react-redux';
import { fetchTweets } from '../../actions/tweetActions.js';
import AllTweets from './AllTweets';

const mapStateToProps = (state) => {
  return {
    tweets: Object.values(state.tweets.all)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTweets: () => dispatch(fetchTweets())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllTweets);
