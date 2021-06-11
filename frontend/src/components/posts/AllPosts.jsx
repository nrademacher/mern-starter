import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PostBox from './PostBox';
import { fetchPosts } from '../../actions/postActions';
import { useDispatch, useSelector } from 'react-redux';

const AllPosts = () => {
  const posts = useSelector((state) => Object.values(state.posts.all));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (posts.length === 0) {
    return (
      <div className="grid place-items-center text-lg font-medium mt-[15vh]">
        There are no Posts 🙁
      </div>
    );
  } else {
    return (
      <div className="mx-auto mt-[5vh] max-w-[95vw] md:max-w-[50vw]">
        <h2 className="text-3xl font-semibold">All Posts</h2>
        {posts.map((post) => (
          <PostBox key={post._id} text={post.text} />
        ))}
      </div>
    );
  }
};

export default withRouter(AllPosts);
