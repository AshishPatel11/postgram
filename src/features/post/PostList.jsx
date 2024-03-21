import { useGetFeedPostsQuery } from '../api/apiSlice';
import Post from './Post';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';
import { ScrollRestoration, useSearchParams } from 'react-router-dom';

function PostList() {
  const [params] = useSearchParams();
  const page = params.get('page');
  console.log(page);
  const { data: posts, isLoading, isSuccess } = useGetFeedPostsQuery(page);

  return (
    <>
      <ScrollRestoration />
      {isLoading && <Loader />}
      {isSuccess && (
        <div>
          <div className="container m-auto">
            {posts.data.data.length ? (
              posts.data.data.map((post) => {
                return <Post key={post._id} post={post} />;
              })
            ) : (
              <span className="text-5xl font-semibold block mt-64 text-center">
                Posts Not Available!
              </span>
            )}
            <Pagination
              pages={Math.ceil(posts?.data?.total / 5)}
              currentPage={parseInt(params.get('page') ?? 1)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default PostList;
