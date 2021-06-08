import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TweetBox from './TweetBox';
import { composeTweet } from '../../actions/tweetActions';

const TweetCompose = (props) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let tweet = {
      text: text,
    };

    dispatch(composeTweet(tweet));
    setText('');
  };

  const update = (e) => {
    setText(e.currentTarget.value);
  };

  return (
    <div className="mx-auto max-w-[95vw] mt-[5vh] md:max-w-prose">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex justify-around w-full">
          <input
            type="textarea"
            value={text}
            onChange={update}
            className="w-2/3 textarea textarea-bordered textarea-primary"
            placeholder="Write your tweet..."
          />
          <input
            type="submit"
            value="Submit"
            className="w-1/4 btn btn-primary"
          />
        </div>
      </form>
      <TweetBox text={text} />
    </div>
  );
};

export default TweetCompose;
