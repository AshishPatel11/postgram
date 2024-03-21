import { useCallback, useEffect, useState } from 'react';
import { userContext } from './context';
import { useGetUserQuery } from '../features/api/apiSlice';
import Loader from '../components/Loader';
import { deleteCookies, getCookie, setCookie } from '../services/cookies';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [skip, setSkip] = useState(true);
  const result = useGetUserQuery(null, {
    skip,
  });

  //add user method
  const addUser = useCallback((user) => {
    console.log(user);
    setCookie('token', user.accessToken, 3);
    setUser(user);
  }, []);

  //remove user method
  const removeUser = useCallback(() => {
    setUser(null);
    deleteCookies('token');
  }, []);

  useEffect(() => {
    const token = getCookie('token');
    //it will call the getUser api
    if (token) {
      setUser({});
      setSkip(false);
    }

    if (result.isSuccess) {
      setUser(result.data.data);
    }
    if (result.isError) {
      toast.error(result.error?.data.message);
      removeUser();
      redirect('/');
    }
  }, [result, addUser, removeUser]);

  const isValidToken = (token) => {
    return token;
  };

  return (
    <userContext.Provider value={{ user, addUser, removeUser, isValidToken }}>
      {result.isLoading ? <Loader /> : children}
    </userContext.Provider>
  );
}

export default UserContextProvider;
