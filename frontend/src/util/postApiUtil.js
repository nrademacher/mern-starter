import axios from 'axios';

export const getPosts = () => {
  return axios.get(`${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : ''}/api/posts`)
};

export const getUserPosts = id => {
  return axios.get(`${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : ''}/api/posts/user/${id}`)
};

export const writePost = data => {
  return axios.post(`${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : ''}/api/posts`, data)
}

export const updatePost = (userId, postId, data) => {
  return axios.patch(`${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : ''}/api/posts/${userId}/${postId}`, {text : data})
}

export const deletePost = (userId, postId) => {
  return axios.delete(`${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : ''}/api/posts/${userId}/${postId}`)
}
