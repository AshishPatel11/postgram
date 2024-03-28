import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../context/context';
import { getCookie } from '../../services/cookies';

function RequiredAuth() {
  const { user } = useUser();

  const token = getCookie('token');
  return token && user ? <Outlet /> : <Navigate to="/" replace />;
}

export default RequiredAuth;
