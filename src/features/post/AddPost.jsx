import { useRef, useState } from 'react';
import { readImage } from '../../services/readImage';
function AddPost({ toggle }) {
  const form = useRef();
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const isLoading = false;
  const fileChange = async (e) => {
    const imageString = await readImage(e.target.files[0]);
    setImage(imageString);
  };
  const handleSubmit = (e) => {
    //
  };

  const hideForm = (e) => {
    if (e.target.id === 'postForm') {
      toggle(false);
      return;
    }
  };
  return (
    <>
      <div
        className="w-screen h-screen fixed top-0 z-50 bg-slate-800 bg-opacity-40 flex items-center justify-center backdrop-box"
        id="postForm"
        onClick={hideForm}
      >
        <div className="bg-white rounded-md w-10/12 md:w-3/5 lg:w-1/2 xl:w-1/3">
          <div className="flex items-center justify-between bg-blue-900 text-white font-semibold rounded-t-md p-1">
            <h1 className="text-lg">Add Post</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="cursor-pointer rounded-full"
              onClick={() => toggle(false)}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6" />
              <path d="m9 9 6 6" />
            </svg>
          </div>
          {/* Add post form ==> */}
          <div className="w-full flex-1 mt-8 p-14">
            <form ref={form} onSubmit={handleSubmit}>
              <div className="mx-auto max-w-sm flex flex-col gap-4">
                <div>
                  <div className="flex items-center justify-center w-full">
                    {!image ? (
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-8 h-8 mb-4 text-gray-500"
                          >
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                            <line x1="16" x2="22" y1="5" y2="5" />
                            <line x1="19" x2="19" y1="2" y2="8" />
                            <circle cx="9" cy="9" r="2" />
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 ">
                            <span className="font-semibold">
                              Click to upload
                            </span>{' '}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, JPEG (MAX. 800x400px)
                          </p>
                        </div>
                      </label>
                    ) : (
                      <div className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#a30000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="z-10"
                            onClick={() => {
                              setImage(null);
                              form.current[0].value = null;
                            }}
                          >
                            <path d="M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                            <line x1="16" x2="22" y1="5" y2="5" />
                            <circle cx="9" cy="9" r="2" />
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                          </svg>
                        </div>
                        <img
                          src={image}
                          className="absolute w-full h-full rounded-xl object-cover object-top opacity-40"
                          alt=""
                        />
                      </div>
                    )}
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      name="image"
                      onChange={fileChange}
                    />
                  </div>
                </div>
                <div>
                  <input
                    className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white
                  ${error?.email ? 'border-red-500 text-red-500' : ''}`}
                    type="text"
                    name="title"
                    placeholder="Title"
                  />
                  <small className="text-red-500 m-0 h-3 ml-1 block">
                    {error?.email}
                  </small>
                </div>
                <div>
                  <textarea
                    className={`w-full resize-none px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white
                    ${error?.password ? 'border-red-500 text-red-500' : ''}`}
                    name="description"
                    placeholder="Description"
                    rows={6}
                  ></textarea>
                  <small className="text-red-500 m-0 h-3 ml-1 block">
                    {error?.password}
                  </small>
                </div>

                <p className="text-center mt-3 text-sm text-red-500 h-1">
                  {error?.auth ? error.auth : ''}
                </p>
                <button
                  className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none disabled:bg-slate-400 cursor-pointer disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isLoading ? true : false}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <polyline points="16 11 18 13 22 9" />
                  </svg>
                  <span className="ml-3">Sign In</span>
                  {isLoading && (
                    <div className="animate-spin ease-linear rounded-full size-6 border-t-2 border-b-2 border-white ml-3"></div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddPost;
