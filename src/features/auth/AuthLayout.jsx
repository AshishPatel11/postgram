import { Navigate, Outlet } from 'react-router-dom';
import social from '../../assets/social.svg';
import { useUser } from '../../context/context';
import { getCookie } from '../../services/cookies';

function AuthLayout() {
  const { user } = useUser();

  const token = getCookie('token');

  if (token && user) {
    return <Navigate to="/home" replace />;
  } else {
    return (
      <>
        <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
          <div className="max-w-screen-xl h-3/4 bg-white border sm:rounded-lg flex justify-center flex-1 shadow-2xl">
            <div className="flex-1 bg-blue-900 text-center hidden md:flex sm:rounded-l-lg">
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
}

export default AuthLayout;
