// src/components/AuthRoute.js
import { Navigate } from 'react-router-dom';
import { getCookie } from '../helpers/cookies';

function AuthRoute({ children }) {
  const token = getCookie('token');
  return !token ? children : <Navigate to="/profile" />;
}

export default AuthRoute;
