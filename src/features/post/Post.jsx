import { useState } from 'react';
import ImageModal from '../../components/ImageModal';
import { useGetPostImageQuery, useGetUserDataQuery } from '../api/apiSlice';
import dateDiff from '../../services/dateDiff';

function Post({ post }) {
  const { title, description, userId, _id: postId, createdAt } = post;
  const { data: user, isLoading } = useGetUserDataQuery(userId);
  const { data: image, isImageLoading } = useGetPostImageQuery(postId);
  const [isModalOpen, setModalOpen] = useState(false);

  //if loading show skeleton ui
  if (isLoading || isImageLoading) {
    return (
      <>
        <div className="bg-white xl:w-1/2 lg:w-9/12 w-11/12 m-auto px-6 py-3 rounded-md shadow-2xl my-9 ">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="52"
              height="52"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d1d5db"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle-user-round"
            >
              <path d="M18 20a6 6 0 0 0-12 0" />
              <circle cx="12" cy="10" r="4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <div className="h-6 w-20 bg-gray-300 rounded-md"></div>
          </div>
          <div className="mt-4">
            <div className="bg-gray-300 h-4 w-44 rounded-md"></div>
            <div className="my-3 flex items-center justify-center mx-auto ">
              <div className="bg-gray-300 h-96 w-full rounded-lg"></div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="w-full h-4 bg-gray-300 rounded-md"></div>
              <div className="w-9/12 h-4 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-white xl:w-1/2 lg:w-9/12 w-11/12 m-auto px-6 py-3 rounded-md shadow-2xl my-9 ">
        <div className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="52"
            height="52"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="rounded-full cursor-pointer"
          >
            <path d="M18 20a6 6 0 0 0-12 0" />
            <circle cx="12" cy="10" r="4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          <div className="flex flex-col items-start">
            <h1 className="text-sm m-0">{user.data.username}</h1>
            <small className="text-xs text-gray-600">
              {dateDiff(createdAt)}
            </small>
          </div>
        </div>
        <div className="mt-4">
          <h1 className="">{title}</h1>
          <div className="my-3 flex items-center justify-center mx-auto ">
            <img
              src={image?.imageData}
              className="rounded-lg size-full cursor-pointer"
              alt=""
              onClick={() => setModalOpen(true)}
            />
            {isModalOpen && (
              <ImageModal src={image?.imageData} toggleModal={setModalOpen} />
            )}
          </div>
          <p className="">{description}</p>
        </div>
      </div>
    </>
  );
}
export default Post;
