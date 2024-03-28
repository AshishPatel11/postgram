import { Link } from 'react-router-dom';
import { useLazyLoginUserQuery } from '../api/apiSlice';
import { toast } from 'react-toastify';
import { useUser } from '../../context/context';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import validationSchema from '../../services/validations';
const { email, password } = validationSchema;

function Signin() {
  //schema for validation
  const signinSchema = yup.object({
    email,
    password,
  });
  //hooks declaration
  const [loginUser, { isLoading }] = useLazyLoginUserQuery();
  const { addUser } = useUser();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors: error },
  } = useForm({ resolver: yupResolver(signinSchema) });

  //submit event handler
  const onSubmit = async (authData) => {
    //API call through RTK query
    await loginUser(authData)
      .unwrap()
      .then((result) => {
        toast.success('Login Successful');
        addUser(result.data);
      })
      .catch((error) => {
        setError('root', { message: error?.data.message });
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mx-auto max-w-sm flex flex-col gap-1 w-96">
                <div className="">
                  <Input
                    type="text"
                    placeholder="Email"
                    error={error?.email}
                    name="email"
                    register={register}
                  />
                </div>

                <div>
                  <Input
                    type={'password'}
                    name={'password'}
                    placeholder={'Password'}
                    error={error?.password}
                    register={register}
                  />
                </div>

                <p className="text-center mt-3 text-sm text-red-500 h-1">
                  {error?.root?.message}
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
