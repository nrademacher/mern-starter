import { connect } from 'react-redux';
import { composePost } from '../../actions/postActions.js';
import PostCompose from './PostCompose';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    composePost: data => dispatch(composePost(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCompose);
