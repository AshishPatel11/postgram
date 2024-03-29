import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import AuthLayout from '../features/auth/AuthLayout';
import Signin from '../features/auth/Signin';
import Signup from '../features/auth/Signup';
import RequiredAuth from '../features/post/RequiredAuth';
import Home from '../features/post/Home';
import NotFound from '../components/NotFound';
import Layout from '../components/Layout';
import Profile from '../features/auth/Profile';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* public routes ==> */}
      <Route element={<AuthLayout />}>
        <Route index element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
      </Route>

      {/* Protected routes */}
      <Route element={<RequiredAuth />}>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Route>
      </Route>

      {/* Page not found */}
      <Route path="/*" element={<NotFound />} />
    </>
  )
);
export default router;
