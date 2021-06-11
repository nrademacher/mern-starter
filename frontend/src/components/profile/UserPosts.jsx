import { useEffect } from 'react';
import PostBox from '../posts/PostBox';
import {
  fetchUserPosts,
  removePost,
  editPost,
} from '../../actions/postActions';
import { useDispatch, useSelector } from 'react-redux';

const UserPosts = () => {
  const posts = useSelector((state) => Object.values(state.posts.user));
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserPosts(currentUser.id));
  }, [currentUser, dispatch]);

  const updatePost = (user, id, edit) => {
    dispatch(editPost(user, id, edit));
  };

  if (posts.length === 0) {
    return (
      <div className="grid place-items-center text-lg font-medium mt-[15vh]">
        This user has no Posts 🙁
      </div>
    );
  } else {
    return (
      <div className="mx-auto mt-[5vh] max-w-[95vw] md:max-w-[50vw]">
        <h2 className="text-3xl font-semibold">Your Posts</h2>
        {posts.map((post) => (
          <PostBox
            key={post._id}
            id={post._id}
            user={currentUser.id}
            text={post.text}
            deletePost={() => dispatch(removePost(currentUser.id, post._id))}
            editPost={updatePost}
          />
        ))}
      </div>
    );
  }
};

export default UserPosts;
