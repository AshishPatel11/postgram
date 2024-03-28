import { useState } from 'react';
import validation from '../services/validation';
import { useSearchParams } from 'react-router-dom';

function Search() {
  const [error, setError] = useState(null);
  const [, setParams] = useSearchParams();

  function handleSearch(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchData = Object.fromEntries(formData.entries());
    if (validation(searchData, setError)) {
      return;
    }
    setParams(searchData);
  }
  
  return (
    <>
      <div className="container mx-auto">
        <div className="xl:w-1/2 lg:w-9/12 w-11/12 m-auto py-3 rounded-md my-9">
          <form
            className="flex items-center my-2 z-50"
            onSubmit={handleSearch}
            onChange={() => setError(null)}
          >
            <div className="w-full">
              <div className="flex">
                <input
                  type="text"
                  name="search"
                  className={`w-full px-5 py-3 rounded-l-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white ${error?.search ? 'border-red-500 text-red-500' : ''}`}
                  placeholder="Search..."
                />
                <span className="flex items-center justify-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-r-lg border-gray-300 w-32">
                  <label className="flex flex-col items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isMyPostsOnly"
                      className="sr-only peer"
                    />
                    <div className="relative w-9 h-5 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-blue-600"></div>
                    <span className="text-xs text-gray-900">My post only</span>
                  </label>
                </span>
              </div>
              <small className="text-red-500 m-0 h-3 ml-1 block">
                {error?.search}
              </small>
            </div>
            <div className="flex items-center">
              <div>
                <button
                  type="submit"
                  className="p-3 ms-2 text-sm font-medium text-white bg-slate-600 rounded-lg border border-slate-500 hover:bg-slate-700 focus:ring-2 focus:outline-none focus:ring-slate-300"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
                <span className="m-0 h-3 ml-1 block"></span>
              </div>
              <div>
                <button
                  type="reset"
                  onClick={() => setParams('')}
                  className="p-3 text-neutral-900 ms-2 border rounded-lg w-32 bg-red-400 font-normal text-sm hover:bg-red-300 focus:ring-2 focus:outline-none focus:ring-slate-300"
                >
                  Clear Search
                </button>
                <span className="m-0 h-3 ml-1 block"></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Search;
