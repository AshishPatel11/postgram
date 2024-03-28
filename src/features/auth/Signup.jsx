import { Link, useNavigate } from 'react-router-dom';
import { useAddUserMutation } from '../api/apiSlice';
import { toast } from 'react-toastify';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import validationSchema from '../../services/validations';
const { firstname, lastname, email, username, password, confirmPassword } =
  validationSchema;

function Signup() {
  //schema for validation
  const signupSchema = yup.object({
    firstname,
    lastname,
    email,
    username,
    password,
    confirmPassword,
  });

  //hooks declaration
  const [addUser, { isLoading }] = useAddUserMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors: error },
  } = useForm({ resolver: yupResolver(signupSchema) });

  //form submit event handler
  const onSubmit = async (userData) => {
    //API call through RTK query
    await addUser({ ...userData, isPrivate: true })
      .unwrap()
      .then((payload) => {
        toast.success(payload.message);
        navigate('/');
      })
      .catch((error) => {
        setError('root', { message: error?.data.message });
      });
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mx-auto max-w-sm flex flex-col gap-1">
                <div className="flex gap-2">
                  <div>
                    <Input
                      type={'text'}
                      error={error?.firstname}
                      name={'firstname'}
                      placeholder={'First name'}
                      register={register}
                    />
                  </div>
                  <div>
                    <Input
                      type={'text'}
                      error={error?.lastname}
                      name={'lastname'}
                      placeholder={'Last name'}
                      register={register}
                    />
                  </div>
                </div>
                <div>
                  <Input
                    type={'text'}
                    error={error?.username}
                    name={'username'}
                    placeholder={'Username'}
                    register={register}
                  />
                </div>
                <div>
                  <Input
                    type={'text'}
                    error={error?.email}
                    name={'email'}
                    placeholder={'Email'}
                    register={register}
                  />
                </div>
                <div>
                  <Input
                    type={'password'}
                    error={error?.password}
                    name={'password'}
                    placeholder={'Password'}
                    register={register}
                  />
                </div>

                <div>
                  <Input
                    type={'password'}
                    error={error?.confirmPassword}
                    name={'confirmPassword'}
                    placeholder={'Confirm Password'}
                    register={register}
                  />
                </div>

                <p className="text-center mt-3 text-sm text-red-500 h-1">
                  {error?.root?.message}
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
