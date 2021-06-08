import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import TweetBox from './TweetBox';
import { fetchTweets } from '../../actions/tweetActions';
import { useDispatch, useSelector } from 'react-redux';

const AllTweets = () => {
  const tweets = useSelector((state) => Object.values(state.tweets.all));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTweets());
  }, [dispatch]);

  if (tweets.length === 0) {
    return (
      <div className="grid place-items-center text-lg font-medium mt-[15vh]">
        There are no Tweets 🙁
      </div>
    );
  } else {
    return (
      <div className="mx-auto mt-[5vh] max-w-[95vw] md:max-w-[50vw]">
        <h2 className="text-3xl font-semibold">All Tweets</h2>
        {tweets.map((tweet) => (
          <TweetBox key={tweet._id} text={tweet.text} />
        ))}
      </div>
    );
  }
};

export default withRouter(AllTweets);
