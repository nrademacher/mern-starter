import {
  RECEIVE_POSTS,
  RECEIVE_USER_POSTS,
  RECEIVE_NEW_POST,
  RECEIVE_UPDATE_POST,
  RECEIVE_DELETE_POST,
} from '../actions/postActions';

const PostsReducer = (
  state = { all: {}, user: {}, new: undefined },
  action
) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_POSTS:
      newState.all = action.posts.data;
      return newState;
    case RECEIVE_USER_POSTS:
      newState.user = action.posts.data;
      return newState;
    case RECEIVE_NEW_POST:
      newState.new = action.post.data;
      return newState;
    case RECEIVE_UPDATE_POST:
      let upUrlArr = action.payload.config.url.split('/');
      let upIdFromUrl = upUrlArr[upUrlArr.length - 1];
      let post = newState.user.find((post) => post._id === upIdFromUrl);
      if (post) {
        post.text = JSON.parse(action.payload.config.data).text;
      }
      return newState;
    case RECEIVE_DELETE_POST:
      let delUrlArr = action.payload.config.url.split('/');
      let delIdFromUrl = delUrlArr[delUrlArr.length - 1];
      newState.user = newState.user.filter((post) => post._id !== delIdFromUrl);
      return newState;
    default:
      return state;
  }
};

export default PostsReducer;
