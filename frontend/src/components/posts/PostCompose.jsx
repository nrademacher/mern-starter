import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PostBox from './PostBox';
import { composePost } from '../../actions/postActions';

const PostCompose = (props) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let post = {
      text: text,
    };

    dispatch(composePost(post));
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
            placeholder="Write your post..."
          />
          <input
            type="submit"
            value="Submit"
            className="w-1/4 btn btn-primary"
          />
        </div>
      </form>
      <PostBox text={text} />
    </div>
  );
};

export default PostCompose;
