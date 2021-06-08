import axios from 'axios';

export const getTweets = () => {
  return axios.get(`${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : ''}/api/tweets`)
};

export const getUserTweets = id => {
  return axios.get(`${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : ''}/api/tweets/user/${id}`)
};

export const writeTweet = data => {
  return axios.post(`${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : ''}/api/tweets`, data)
}

export const updateTweet = (userId, tweetId, data) => {
  return axios.patch(`${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : ''}/api/tweets/${userId}/${tweetId}`, {text : data})
}

export const deleteTweet = (userId, tweetId) => {
  return axios.delete(`${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : ''}/api/tweets/${userId}/${tweetId}`)
}
