import { useState } from 'react';
import AddPost from '../features/post/AddPost';
import { useUser } from '../context/context';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

function Navbar() {
  const [toggleForm, setToggleForm] = useState(false);
  const navigate = useNavigate();
  const { removeUser } = useUser();
  const logout = () => {
    removeUser();
    navigate('/');
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
            <div className="rounded-full">
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
            </div>
          </div>
        </nav>
      </div>
      {toggleForm && <AddPost toggleForm={setToggleForm} />}
    </>
  );
}

export default Navbar;
