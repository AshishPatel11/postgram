import { useEffect, useState } from 'react';
import { useGetFeedPostsQuery } from '../api/apiSlice';
import Post from './Post';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';

function PostList() {
  const [page, setPage] = useState(1);
  const [postFeed, setPostFeed] = useState([]);
  const { data: posts, isLoading, isSuccess } = useGetFeedPostsQuery(page);

  useEffect(() => {
    if (isSuccess) {
      const feed = posts.data.data.map((post) => {
        // console.log(post._id);
        return (
          <Post
            key={post._id}
            title={post.title}
            description={post.description}
            userId={post.userId}
            postId={post._id}
            createdAt={post.createdAt}
          />
        );
      });
      setPostFeed(feed);
    }
  }, [isSuccess, posts]);
  return (
    <>
      {isLoading && <Loader />}
      <div>
        <div className="container m-auto">
          {postFeed}
          <Pagination pages={5} />
        </div>
      </div>
    </>
  );
}

export default PostList;
