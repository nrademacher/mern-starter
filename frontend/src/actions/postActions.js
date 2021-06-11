import {
  getPosts,
  getUserPosts,
  writePost,
  updatePost,
  deletePost
} from '../util/postApiUtil';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_USER_POSTS = 'RECEIVE_USER_POSTS';
export const RECEIVE_NEW_POST = 'RECEIVE_NEW_POST';
export const RECEIVE_UPDATE_POST = 'RECEIVE_UPDATE_POST';
export const RECEIVE_DELETE_POST = 'RECEIVE_DELETE_POST';

export const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts,
});

export const receiveUserPosts = (posts) => ({
  type: RECEIVE_USER_POSTS,
  posts,
});

export const receiveNewPost = (post) => ({
  type: RECEIVE_NEW_POST,
  post,
});

export const receiveUpdatePost = (payload) => ({
  type: RECEIVE_UPDATE_POST,
  payload,
});

export const receiveDeletePost = (payload) => ({
  type: RECEIVE_DELETE_POST,
  payload,
});

export const fetchPosts = () => (dispatch) =>
  getPosts()
    .then((posts) => dispatch(receivePosts(posts)))
    .catch((err) => console.log(err));

export const fetchUserPosts = (id) => (dispatch) =>
  getUserPosts(id)
    .then((posts) => dispatch(receiveUserPosts(posts)))
    .catch((err) => console.log(err));

export const composePost = (data) => (dispatch) =>
  writePost(data)
    .then((post) => dispatch(receiveNewPost(post)))
    .catch((err) => console.log(err));

export const editPost = (userId, postId, data) => (dispatch) => {
  updatePost(userId, postId, data)
    .then((post) => dispatch(receiveUpdatePost(post)))
    .catch((err) => console.log(err));
}

export const removePost = (userId, postId) => (dispatch) =>
  deletePost(userId, postId)
    .then((post) => dispatch(receiveDeletePost(post)))
    .catch((err) => console.log(err));
