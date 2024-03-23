import { useState } from 'react';
import { useUser } from '../../context/context';
import UpdateProfile from './UpdateProfile';

function Profile() {
  const { user } = useUser();
  const [toggleForm, setToggleForm] = useState(false);
  return (
    <>
      {toggleForm && <UpdateProfile toggleForm={setToggleForm} />}
      <div className="container mx-auto mt-20">
        <div className=" bg-white h-14 rounded-xl border-2 border-gray-300 px-6 flex items-start justify-center flex-col">
          <button className="border-b-2 inline-flex items-center font-medium cursor-pointer text-lg text-blue-900 h-full border-blue-700">
            Profile
          </button>
        </div>
        <div className="bg-white rounded-xl mt-8 border-2 border-gray-300 px-6 py-4">
          <div className="flex items-center justify-start gap-8">
            <h3 className="font-medium text-xl">Primary Details</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="cursor-pointer"
              onClick={() => setToggleForm(true)}
            >
              <path d="m18 5-3-3H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
              <path d="M8 18h1" />
              <path d="M18.4 9.6a2 2 0 1 1 3 3L17 17l-4 1 1-4Z" />
            </svg>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="">
              <h6 className="text-base text-black">First Name</h6>
              <span className="font-semibold">{user.firstname}</span>
            </div>
            <div>
              <h6 className="text-base text-black">Last Name</h6>
              <span className="font-semibold">{user.lastname}</span>
            </div>
            <div>
              <h6 className="text-base text-black">User Name</h6>
              <span className="font-semibold">{user.username}</span>
            </div>
            <div>
              <h6 className="text-base text-black">Email</h6>
              <span className="font-semibold">{user.email}</span>
            </div>
            <div>
              <h6 className="text-base text-black">Private</h6>
              <span className="font-semibold">{user.isPrivate && 'Yes'}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
