import { useAuth } from '../helpers/useAuth';
import { Navigate } from 'react-router-dom';

export function RequireAuth({ children }) {
  const { authed } = useAuth();
  // console.log('Authed:' + authed);

  return localStorage.getItem('Auth') == 1 ? children : <Navigate to='/login' replace />;
}
