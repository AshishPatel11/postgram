import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLazyLoginUserQuery } from '../api/apiSlice';
import { setCookie } from '../../services/cookies';
import { toast } from 'react-toastify';
import { useUser } from '../../context/context';
function Signin() {
  const form = useRef();
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const [loginUser] = useLazyLoginUserQuery();
  const [, setUser] = useUser();

  //submit event handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    //getting formData
    const formData = new FormData(form.current);
    const authData = Object.fromEntries(formData.entries());

    //API call through RTK query
    await loginUser(authData)
      .unwrap()
      .then((result) => {
        setCookie('token', result.data.accessToken, 3);
        setUser(result.data);
        toast.success('Login Successful');
        navigate('/home', { replace: true });
      })
      .catch((error) => {
        setError({ auth: error?.data.message });
      });
  };

  return (
    <>
      <div className="lg:w-1/2 xl:w-1/2 p-6 sm:p-12 flex items-center justify-center">
        <div className="w-auto h-auto bg-red-600">
          <div
            role="status"
            className="w-full h-full flex items-center justify-center"
          >
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>

        <div className=" flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
              Sign In
            </h1>
            <p className="text-center mt-3 text-sm text-red-500 h-1">
              {error?.auth ? error.auth : ''}
            </p>
          </div>
          <div className="w-full flex-1 mt-8">
            <form ref={form} onSubmit={handleSubmit}>
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  name="password"
                  required
                  placeholder="Password"
                />
                <button
                  className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  type="submit"
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
