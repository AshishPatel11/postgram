import { useEffect, useState } from 'react';
import { useGetFeedPostsQuery } from '../api/apiSlice';
import Post from './Post';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';
import { ScrollRestoration, useSearchParams } from 'react-router-dom';

function PostList() {
  const [params, setParams] = useSearchParams();
  const [postFeed, setPostFeed] = useState([]);
  const {
    data: posts,
    isLoading,
    isSuccess,
  } = useGetFeedPostsQuery(params.get('page') ?? 1);
  useEffect(() => {
    if (isSuccess) {
      const feed = posts.data.data.map((post) => {
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
      <ScrollRestoration />
      {isLoading && <Loader />}
      {isSuccess && (
        <div>
          <div className="container m-auto">
            {postFeed.length ? (
              postFeed
            ) : (
              <h1 className="text-center mt-28 text-5xl font-semibold">
                Posts Not Available!
              </h1>
            )}
            <Pagination
              pages={Math.ceil(posts?.data?.total / 5)}
              currentPage={parseInt(params.get('page') ?? 1)}
              setPage={setParams}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default PostList;
