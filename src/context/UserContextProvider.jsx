import { useCallback, useEffect, useState } from 'react';
import { userContext } from './context';
import { useGetUserQuery } from '../features/api/apiSlice';
import Loader from '../components/Loader';
import { deleteCookies, getCookie } from '../services/cookies';
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
      addUser({});
      setSkip(false);
    }

    if (result.isSuccess) {
      addUser(result.data.data);
    }
    if (result.isError) {
      toast.error(result.error?.data.message);
      console.log('object');
      removeUser();
      redirect('/');
    }
  }, [result, addUser, removeUser]);

  return (
    <userContext.Provider value={{ user, addUser, removeUser }}>
      {result.isLoading ? <Loader /> : children}
    </userContext.Provider>
  );
}

export default UserContextProvider;
