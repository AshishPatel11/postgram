import { useGetFeedPostsQuery } from '../api/apiSlice';
import Post from './Post';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';
import { ScrollRestoration, useSearchParams } from 'react-router-dom';
import NotFound from '../../components/NotFound';

function PostList() {
  const [params, setParams] = useSearchParams();
  const page = params.get('page');
  console.log(params.get('search'));
  if (page == 1) {
    setParams('');
  }
  const query = Object.fromEntries(params.entries());
  const { data: posts, isLoading, isSuccess } = useGetFeedPostsQuery(query);

  return (
    <>
      <ScrollRestoration />
      {isLoading && <Loader />}
      {isSuccess && (
        <div>
          <div className="container m-auto">
            {posts.data.total ? (
              posts.data.data.map((post) => {
                return <Post key={post._id} post={post} />;
              })
            ) : (
              <span className="text-5xl font-semibold block mt-64 text-center">
                Posts Not Available!
              </span>
            )}

            {!posts?.data?.data.length && posts.data.total ? <NotFound /> : ''}
            {!params.get('search') && (
              <Pagination
                pages={Math.ceil(posts?.data?.total / 5)}
                currentPage={parseInt(params.get('page') ?? 1)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default PostList;
