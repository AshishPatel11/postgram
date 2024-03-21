import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLazyLoginUserQuery } from '../api/apiSlice';
import { toast } from 'react-toastify';
import { useUser } from '../../context/context';
import validation from '../../services/validation';
import Button from '../../components/Button';
import Input from '../../components/Input';
function Signin() {
  const form = useRef();
  const [error, setError] = useState({});
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
        addUser(result.data);
        toast.success('Login Successful');
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
                  <Input
                    type="text"
                    placeholder="Email"
                    error={error?.email}
                    name="email"
                  />
                </div>
                <div>
                  <Input
                    type={'password'}
                    name={'password'}
                    placeholder={'Password'}
                    error={error?.password}
                  />
                </div>

                <p className="text-center mt-3 text-sm text-red-500 h-1">
                  {error?.auth ? error.auth : ''}
                </p>

                <Button type="submit" isLoading={isLoading}>
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
                </Button>
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
