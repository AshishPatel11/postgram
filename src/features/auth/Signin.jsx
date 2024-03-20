import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLazyLoginUserQuery } from '../api/apiSlice';
import { setCookie } from '../../services/cookies';
import { toast } from 'react-toastify';
import { useUser } from '../../context/context';
import validation from '../../services/validation';

function Signin() {
  const form = useRef();
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLazyLoginUserQuery();
  const { addUser } = useUser();

  //submit event handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    //getting formData
    const formData = new FormData(form.current);
    const authData = Object.fromEntries(formData.entries());

    if (validation(authData, setError)) {
      return;
    }
    //API call through RTK query
    await loginUser(authData)
      .unwrap()
      .then((result) => {
        setCookie('token', result.data.accessToken, 3);
        addUser(result.data);
        toast.success('Login Successful');
        navigate('/home', { replace: true });
      })
      .catch((error) => {
        setError({ auth: error?.data.message });
      });
  };

  return (
    <>
      <div className="lg:w-1/2 xl:w-1/2 p-6 sm:p-12 flex items-center justify-center relative">
        <div className=" flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
              Sign In
            </h1>
          </div>
          <div className="w-full flex-1 mt-8">
            <form
              ref={form}
              onSubmit={handleSubmit}
              onChange={() => setError(null)}
            >
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <div>
                  <input
                    className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white
                  ${error?.email ? 'border-red-500 text-red-500' : ''}`}
                    type="text"
                    name="email"
                    placeholder="Email"
                  />
                  <small className="text-red-500 m-0 h-3 ml-1 block">
                    {error?.email}
                  </small>
                </div>
                <div>
                  <input
                    className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white
                    ${error?.password ? 'border-red-500 text-red-500' : ''}`}
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
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
            <p className="mt-6 text-sm text-gray-600 text-center">
              {`Don't have an account?`}{' '}
              <Link to="/sign-up">
                <span className="text-blue-900 font-semibold">Sign Up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
