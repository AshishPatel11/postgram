import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../context/context';

function RequiredAuth() {
  const { user } = useUser();
  return user ? <Outlet /> : <Navigate to="/" replace />;
}

export default RequiredAuth;
