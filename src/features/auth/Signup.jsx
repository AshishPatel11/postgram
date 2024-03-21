import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAddUserMutation } from '../api/apiSlice';
import { toast } from 'react-toastify';
import validation from '../../services/validation';
import Button from '../../components/Button';
import Input from '../../components/Input';

function Signup() {
  const form = useRef();
  const [error, setError] = useState(null);
  const [addUser, { isLoading }] = useAddUserMutation();
  const navigate = useNavigate();
  //form submit event handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    //getting formData
    const formData = new FormData(form.current);
    const userData = Object.fromEntries(formData.entries());

    if (validation(userData, setError)) {
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      //password matching
      setError({ match: 'Password does not match!' });
      return;
    } else {
      //API call through RTK query
      await addUser({ ...userData, isPrivate: true })
        .unwrap()
        .then((payload) => {
          toast.success(payload.message);
          navigate('/');
        })
        .catch((error) => {
          setError({ auth: error?.data.message });
        });
    }
  };

  return (
    <>
      <div className="lg:w-1/2 xl:w-1/2 p-6 sm:p-12 h-full flex items-center justify-center relative">
        <div className=" flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
              Sign Up
            </h1>
          </div>

          <div className="w-full flex-1 mt-8">
            <form
              onSubmit={handleSubmit}
              ref={form}
              onChange={() => setError(null)}
            >
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <div className="flex gap-3">
                  <div>
                    <Input
                      type={'text'}
                      error={error?.firstname}
                      name={'firstname'}
                      placeholder={'First name'}
                    />
                  </div>
                  <div>
                    <Input
                      type={'text'}
                      error={error?.lastname}
                      name={'lastname'}
                      placeholder={'Last name'}
                    />
                  </div>
                </div>
                <div>
                  <Input
                    type={'text'}
                    error={error?.username}
                    name={'username'}
                    placeholder={'Username'}
                  />
                </div>
                <div>
                  <Input
                    type={'text'}
                    error={error?.email}
                    name={'email'}
                    placeholder={'Email'}
                  />
                </div>
                <div>
                  <Input
                    type={'password'}
                    error={error?.password}
                    name={'password'}
                    placeholder={'Password'}
                  />
                </div>
                <div>
                  <Input
                    type={'password'}
                    error={error?.confirmPassword || error?.match}
                    name={'confirmPassword'}
                    placeholder={'Confirm Password'}
                  />
                </div>
                <p className="text-center mt-3 text-sm text-red-500 h-1">
                  {error?.auth ? error.auth : ''}
                </p>
                <Button type={'submit'} isLoading={isLoading}>
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
                </Button>
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
