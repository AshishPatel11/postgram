import { useState } from 'react';
import AddPost from '../features/post/AddPost';
import { useUser } from '../context/context';
import { toast } from 'react-toastify';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [toggleForm, setToggleForm] = useState(false);
  const { user } = useUser();
  console.log(user);
  const [toggleLogout, setToggleLogout] = useState(false);
  const { removeUser } = useUser();
  const location = useLocation();
  const logout = () => {
    if (confirm('Are you sure you want to log out!')) {
      toast.success('Logged Out!');
      removeUser();
    }
    return;
  };
  return (
    <>
      <div className="h-16 sticky  my-5 top-0  flex items-center z-10 mb-12">
        <nav className="flex items-center justify-between text-blue-900 container m-auto bg-white p-3 rounded-3xl shadow-2xl">
          <h1 className="postgram text-5xl cursor-pointer">Postgram</h1>
          <div className="flex justify-between">
            <button
              className="bg-blue-800 flex items-center justify-center gap-2 text-white py-1 px-4 rounded-2xl me-6 hover:bg-indigo-700 transition-all duration-300 ease-in-out"
              onClick={() => setToggleForm(true)}
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
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M8 12h8" />
                <path d="M12 8v8" />
              </svg>
              Add Post
            </button>
            {location.pathname === '/home' ? (
              <Link
                to={`/profile/${user._id}`}
                className="border-2 border-blue-800 flex items-center justify-center gap-2 text-blue-800 py-1 px-4 rounded-2xl me-6 hover:border-indigo-300 transition-all duration-300 ease-in-out"
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
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
                </svg>
                Profile
              </Link>
            ) : (
              <Link
                to={'/home'}
                className="border-2 border-blue-800 flex items-center justify-center gap-2 text-blue-800 py-1 px-4 rounded-2xl me-6 hover:border-indigo-300 transition-all duration-300 ease-in-out"
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
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Home
              </Link>
            )}

            <div className="rounded-full relative">
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
                onClick={() => setToggleLogout((prev) => !prev)}
              >
                <path d="M18 20a6 6 0 0 0-12 0" />
                <circle cx="12" cy="10" r="4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              {toggleLogout && (
                <div className="bg-slate-500 w-24 text-white py-2 rounded-md absolute right-0 my-1 mx-0 flex flex-col items-center justify-center gap-1">
                  <button
                    className="py-1 px-2 hover:bg-slate-400 w-full"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
      {toggleForm && <AddPost toggleForm={setToggleForm} />}
    </>
  );
}

export default Navbar;
