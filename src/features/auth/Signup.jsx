import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAddUserMutation } from '../api/apiSlice';

function Signup() {
  const form = useRef();
  const [error, setError] = useState({});
  const [addUser, result] = useAddUserMutation();
  //form submit event handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const userData = Object.fromEntries(formData.entries());
    if (userData.password !== userData.confirmPassword) {
      setError({ password: 'Password does not match!' });
      return;
    } else {
      try {
        //apicall
        await addUser({ ...userData, isPrivate: true }).unwrap();
        console.log(result);
      } catch {
        //
        console.log('catch', result);
      }
    }
  };

  return (
    <>
      <div className="lg:w-1/2 xl:w-1/2 p-6 sm:p-12 flex items-center justify-center">
        <div className=" flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
              Sign Up
            </h1>
          </div>
          <div className="w-full flex-1 mt-8">
            <form onSubmit={handleSubmit} ref={form}>
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <div className="flex gap-3">
                  <div>
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      name="firstname"
                      required
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      name="lastname"
                      required
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <div>
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    name="username"
                    required
                    placeholder="Username"
                  />
                </div>
                <div>
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                  />
                </div>
                <div>
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    name="password"
                    required
                    placeholder="Password"
                  />
                </div>
                <div>
                  <input
                    className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white
                  ${error?.password ? 'border-red-500 text-red-500' : ''}`}
                    type="password"
                    name="confirmPassword"
                    required
                    placeholder="Confirm Password"
                  />
                  <small className="text-red-500 m-0 h-5 block">
                    {error?.password}
                  </small>
                </div>
                <button
                  className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  type="submit"
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign Up</span>
                </button>
              </div>
            </form>
            <p className="mt-6 text-sm text-gray-600 text-center">
              Already have an account?{' '}
              <Link to="/">
                <span className="text-blue-900 font-semibold">Sign In</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
