import { useEffect, useState } from 'react';
import { userContext } from './context';
import { deleteCookies, getCookie } from '../services/cookies';
import { useLazyGetUserQuery } from '../features/api/apiSlice';
import { toast } from 'react-toastify';

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [getUser, { data, isError, error }] = useLazyGetUserQuery();

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      getUser();
    }
  }, [getUser]);

  useEffect(() => {
    if (data) setUser(data.data);
  }, [data]);

  useEffect(() => {
    if (isError) {
      deleteCookies('token');
      toast.error(error.data.message);
    }
  }, [isError, error]);

  return (
    <userContext.Provider value={[user, setUser]}>
      {children}
    </userContext.Provider>
  );
}

export default UserContextProvider;
