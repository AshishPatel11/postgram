import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router.jsx';
import store from './features/app/store.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContextProvider from './context/UserContextProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <ToastContainer />
    <Provider store={store}>
      <UserContextProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </UserContextProvider>
    </Provider>
  </>
);
