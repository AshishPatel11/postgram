import { Outlet } from 'react-router-dom';
import social from '../../assets/social.svg';

function AuthLayout() {
  return (
    <>
      <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
        <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 bg-blue-900 text-center hidden md:flex">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
              <img className="h-full" src={social} alt="" />
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AuthLayout;
