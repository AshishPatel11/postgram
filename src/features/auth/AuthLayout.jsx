import { Outlet, useNavigate } from 'react-router-dom';
import social from '../../assets/social.svg';
import { useEffect } from 'react';
import { useLazyGetUserQuery } from '../api/apiSlice';
import { useUser } from '../../context/context';
import { getCookie } from '../../services/cookies';
function AuthLayout() {
  const [getUser, { data }] = useLazyGetUserQuery();
  const [, setUser] = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      getUser();
    }
  }, [getUser]);

  useEffect(() => {
    if (data) {
      setUser(data.data);
      navigate('/home', { replace: true });
    }
  }, [data]);

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
