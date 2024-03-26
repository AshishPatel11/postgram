import { useRef, useState } from 'react';
import validation from '../../services/validation';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useUpdateUserMutation } from '../api/apiSlice';
import { useUser } from '../../context/context';
import { toast } from 'react-toastify';

function UpdateProfile({ toggleForm }) {
  const form = useRef();
  const [error, setError] = useState(null);
  const [updateUSer, { isLoading }] = useUpdateUserMutation();
  const { user } = useUser();
  //form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const userData = Object.fromEntries(formData.entries());
    if (validation(userData, setError)) {
      return;
    } else {
      await updateUSer(userData)
        .unwrap()
        .then(() => {
          toast.success('Profile updated successfully');
          toggleForm(false);
        })
        .catch((error) => {
          setError({ auth: error?.data.message });
        });
    }
  };

  //for hiding the form
  const hideForm = (e) => {
    if (e.target.id === 'postForm') {
      toggleForm(false);
      return;
    }
  };

  return (
    <>
      <div
        className="w-screen h-screen fixed top-0 z-50 bg-slate-800 bg-opacity-40 flex items-center justify-center backdrop-box"
        id="postForm"
        onClick={hideForm}
      >
        <div className="bg-white rounded-md w-10/12 md:w-3/5 lg:w-1/2 xl:w-1/3">
          <div className="flex items-center justify-between bg-blue-900 text-white font-semibold rounded-t-md p-1">
            <h1 className="text-lg">Update Profile</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="cursor-pointer rounded-full"
              onClick={() => toggleForm(false)}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6" />
              <path d="m9 9 6 6" />
            </svg>
          </div>
          {/* Add post form ==> */}
          <div className="w-full flex-1 p-14">
            <form
              ref={form}
              onSubmit={handleSubmit}
              onChange={() => setError(null)}
            >
              <div className="mx-auto max-w-sm flex flex-col gap-4">
                <div>
                  <label className="text-sm" htmlFor="firstname">
                    First Name
                  </label>
                  <Input
                    type={'text'}
                    name={'firstname'}
                    error={error?.firstname}
                    id={'firstname'}
                    placeholder={'First Name'}
                    defaultValue={user.firstname}
                  />
                </div>
                <div>
                  <label className="text-sm" htmlFor="lastname">
                    Last Name
                  </label>
                  <Input
                    type={'text'}
                    name={'lastname'}
                    error={error?.lastname}
                    id={'lastname'}
                    placeholder={'Last Name'}
                    defaultValue={user.lastname}
                  />
                </div>
                <div>
                  <label className="text-sm" htmlFor="username">
                    User Name
                  </label>
                  <Input
                    type={'text'}
                    name={'username'}
                    error={error?.username}
                    id={'username'}
                    placeholder={'User Name'}
                    defaultValue={user.username}
                  />
                </div>
                <div>
                  <label className="text-sm" htmlFor="email">
                    Email
                  </label>
                  <Input
                    type={'text'}
                    name={'email'}
                    error={error?.email}
                    placeholder={'Email'}
                    defaultValue={user.email}
                    id={'email'}
                  />
                </div>

                <p className="text-center mt-2 text-sm text-red-500 h-1">
                  {error?.auth ? error.auth : ''}
                </p>

                <Button type={'submit'} isLoading={isLoading}>
                  <span className="ml-3">Save</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProfile;
