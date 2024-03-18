import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/context';
import { deleteCookies } from '../../services/cookies';

function Home() {
  const [, setUser] = useUser();
  const navigate = useNavigate();
  const logout = () => {
    deleteCookies('token');
    setUser(null);
    navigate('/');
  };
  return (
    <>
      <h1>Home</h1>
      <button
        onClick={logout}
        className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-red-600 border border-red-700 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Logout
      </button>
    </>
  );
}

export default Home;
