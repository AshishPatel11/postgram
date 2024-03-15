import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import AuthLayout from '../features/auth/AuthLayout';
import Signin from '../features/auth/Signin';
import Signup from '../features/auth/Signup';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* public routes ==> */}
      <Route path="" element={<AuthLayout />}>
        <Route index element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
      </Route>
    </>
  )
);
export default router;
