import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/postActions.js';
import AllPosts from './AllPosts';

const mapStateToProps = (state) => {
  return {
    posts: Object.values(state.posts.all)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPosts);
