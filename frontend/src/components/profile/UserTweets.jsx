import React, { useEffect } from 'react';
import TweetBox from '../tweets/TweetBox';
import {
  fetchUserTweets,
  removeTweet,
  editTweet,
} from '../../actions/tweetActions';
import { useDispatch, useSelector } from 'react-redux';

const UserTweets = () => {
  const tweets = useSelector((state) => Object.values(state.tweets.user));
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserTweets(currentUser.id));
  }, [currentUser, dispatch]);

  const updateTweet = (user, id, edit) => {
    dispatch(editTweet(user, id, edit));
  };

  if (tweets.length === 0) {
    return (
      <div className="grid place-items-center text-lg font-medium mt-[15vh]">
        This user has no Tweets 🙁
      </div>
    );
  } else {
    return (
      <div className="mx-auto mt-[5vh] max-w-[95vw] md:max-w-[50vw]">
        <h2 className="text-3xl font-semibold">Your Tweets</h2>
        {tweets.map((tweet) => (
          <TweetBox
            key={tweet._id}
            id={tweet._id}
            user={currentUser.id}
            text={tweet.text}
            deleteTweet={() => dispatch(removeTweet(currentUser.id, tweet._id))}
            editTweet={updateTweet}
          />
        ))}
      </div>
    );
  }
};

export default UserTweets;
