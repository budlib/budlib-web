import { Navigate } from 'react-router-dom';

export function RequireAuth({ children }) {
  return localStorage.getItem('Authenticated') === '1' ? children : <Navigate to='/login' replace />;
}
