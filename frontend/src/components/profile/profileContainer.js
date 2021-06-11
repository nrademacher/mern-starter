import { connect } from 'react-redux';
import { fetchUserPosts, removePost } from '../../actions/postActions';
import UserPosts from './UserPosts';

const mapStateToProps = (state) => {
  return {
    posts: Object.values(state.posts.user),
    currentUser: state.session.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserPosts: id => dispatch(fetchUserPosts(id)),
    removePost: (userId, postId) => dispatch(removePost(userId, postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);
