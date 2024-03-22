import { useCallback, useEffect, useState } from 'react';
import { userContext } from './context';
import { useGetUserQuery } from '../features/api/apiSlice';
import Loader from '../components/Loader';
import { deleteCookies, getCookie, setCookie } from '../services/cookies';
import { toast } from 'react-toastify';

function UserContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [skip, setSkip] = useState(true);

  const result = useGetUserQuery(null, {
    skip,
  });

  //add user method
  const addUser = useCallback((user) => {
    setCookie('token', user.accessToken, 3);
    setUser(user);
  }, []);

  //remove user method
  const removeUser = useCallback(() => {
    deleteCookies('token');
    setUser({});
  }, []);

  useEffect(() => {
    const token = getCookie('token');
    //it will call the getUser api
    if (token) {
      setSkip(false);
    }
    //if token is verified set current userData in state
    if (result.isSuccess) {
      setUser(result.data.data);
    }
    //if token is not verified then remove the user from state and cookie
    if (result.isError) {
      toast.error(result.error?.data.message);
      removeUser();
    }
  }, [result, addUser, removeUser]);

  return (
    <userContext.Provider value={{ user, addUser, removeUser }}>
      {result.isLoading ? <Loader /> : children}
    </userContext.Provider>
  );
}

export default UserContextProvider;
